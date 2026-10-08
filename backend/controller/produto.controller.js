const Produto = require('../models/produto')

const cadastrar = async (req,res)=>{
    const valores = req.body
    console.log(valores)

    if(!valores.nomeProduto || !valores.categoria || !valores.precoUnitario || !valores.qtdeEstoque || !valores.data){
        return res.status(400).json({message: 'Todos os campos são <bold>obrigatórios!</bold>'})
    }

    try{
        await Produto.create(valores)
        res.status(200).json({message: 'Produto cadastrado com sucesso!'})
    }catch(err){
        console.error('Erro ao cadastrar o produto!',err)
        res.status(500).json({message: 'Erro ao cadastrar o produto!'})
    }
}
const consultar = async (req,res)=>{
    const id = req.params.id
    console.log('Código do produto = ', id)

    if(!id){
        return res.status(400).json({message: 'o código do produto é <bold>obrigatório!</bold>'})
    }
    
    
    try{
        const produto = await Produto.findByPk(id)
        if(!produto){
            return res.status(404).json({message: 'O produto não foi encontrado!'})
        }
        res.status(200).json(produto)

    }catch(err){
        res.status(500).json({message: 'Erro ao consultar o produto!'})
        console.error('Erro ao consultar o produto!',err)
    }
}
const listar = async (req,res)=>{
    try{
        const dados = await Produto.findAll()
        res.status(200).json(dados)
    }catch(err){
        res.status(500).json({message: 'Erro ao listar o produto!'})
        console.error('Erro ao listar o produto!',err)
    }
}
const atualizar = async (req,res)=>{
    const id = req.params.id
    console.log('Código do produto = ', id)
    const valores = req.body
    console.log(valores)

    if(!id){
        return res.status(400).json({message: 'O código do produto é <bold>obrigatório!</bold>'})
    }
    if(!valores){
        return res.status(400).json({message: 'Todos os campos são <bold>obrigatórios!</bold>'})
    }
    try{
        const produto = await Produto.findByPk(id)

        if(!produto){
            return res.status(404).json({message: 'O produto não foi encontrado!'})
        }

    await Produto.update(valores,{where: {codProduto: id}})

    const dados = await Produto.findByPk(id)
    

        
        res.status(200).json(dados)
    }catch(err){
        res.status(500).json({message: 'Erro ao consultar o produto!'})
        console.error('Erro ao consultar o produto!',err)
    }
}
const apagar = async (req,res)=>{
    const id = req.params.id
    console.log('Código do produto = ', id)

    if(!id){
        return res.status(400).json({message: 'o código do produto é <bold>obrigatório!</bold>'})
    }
    
    
    try{
        const produto = await Produto.findByPk(id)
        if(!produto){
            return res.status(404).json({message: 'O produto não foi encontrado!'})
        }

        await Produto.destroy({where: {codProduto: id}})

        res.status(200).json({message: 'Produto apagado com sucesso!'})

    }catch(err){
        res.status(500).json({message: 'Erro ao apagar o produto!'})
        console.error('Erro ao apagar o produto!',err)
    }
}

module.exports = { cadastrar, consultar, listar, atualizar, apagar }