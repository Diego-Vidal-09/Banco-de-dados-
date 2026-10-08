const express = require('express')
const app = express()

const cors = require('cors')
const conn = require('./db/conn')

const PORT = 3000 //porta TCP
const hostname = 'localhost' // endereço IP = 127.0.0.1, localhost = 127.0.0.1

const usuarioController = require('./controller/usuario.controller')
const produtoController = require('./controller/produto.controller')
// ---------------------Middleware---------------------
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(cors())
//-----------------------------------------------------

app.post('/usuario', usuarioController.cadastrar)
app.get('/usuario/:id', usuarioController.consultar)
app.get('/usuarios', usuarioController.listar)
app.put('/usuario/:id', usuarioController.atualizar)
app.delete('/usuario/:id', usuarioController.apagar)

app.post('/produto', produtoController.cadastrar)
app.get('/produto/:id', produtoController.consultar)
app.get('/produtos', produtoController.listar)
app.put('/produto/:id', produtoController.atualizar)
app.delete('/produto/:id', produtoController.apagar)

app.get('/',(req,res)=>{
    res.status(200).json({message: 'Aplicação rodando!'})
})

//----------------------Server-------------------------
conn.sync()
.then(()=>{
    app.listen(PORT,hostname,()=>{
        console.log(`Servidor rodando em http://${hostname}:${PORT}`)
    })
})
.catch((err)=>{
    console.error('Erro ao sincronizar com o bando de dados!')
})