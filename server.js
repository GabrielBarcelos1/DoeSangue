//configurando o servidor
const express = require("express")
const server = express()





//configurar apresentação da pagina
server.get("/", function(req, res){
    return res.send("ok, cheguei aqui")
})




//ligar o servidor e perm
server.listen(3000,function(){
    console.log("iniciei o servidor")
})