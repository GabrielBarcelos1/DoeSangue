//configurando o servidor
const express = require("express")
const server = express()

//conexao com o bd
const mysql = require('mysql')
var db = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'doe',
    port: 3306
  });
  db.connect(function(err) {
    if (err) {
      console.error('error connecting: ' + err.stack);
      return;
    }
   
    console.log('connected as id ' + db.threadId);
  });
  


//configurar o servidor para apresentar arquivos estaticos
server.use(express.static('public'))

//habilitar body do formulario
server.use(express.urlencoded({extended: true}))



//configurando a template engine
const nunjucks = require("nunjucks")
nunjucks.configure("./", {
    express: server,
    noCache: true
})
//configurar apresentação da pagina
server.get("/", function(req, res){
    db.query("select * from donors", function(err, result){
        if (err) return res.send("Erro de banco de dados.")
       //else return res.send(result)

    
        const donors = result
        
        
      return res.render("index.html", {donors})
    })
})
server.post("/", function(req,res){
    //pegar dados do formulario
    const name = req.body.name
    const email = req.body.email
    const blood = req.body.blood
    if(name == "" || email == "" || blood == "" ){
        return res.send("Todos os campos são obrigatórios.")
    }
    //colocar valores dentro do banco de dados
    const query =`INSERT INTO donors (nome,email,blood) 
    VALUES ('${name}', '${email}', '${blood}')`
    db.query(query,function(err){
        //fluxo de erro
        if(err) return res.send ("erro no banco de dados.")
        //fluxo ideal
        return res.redirect("/")
    })
    
})

//ligar o servidor e permitir o acesso na porta 3000
server.listen(3000,function(){
    console.log("iniciei o servidor")
})