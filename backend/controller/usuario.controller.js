const Usuario = require('../models/usuario')

const cadastrar = async (req,res)=>{
    const valores = req.body
    console.log(valores)

    if(!valores.nome || !valores.email || !valores.senha){
        return res.status(400).json({message: 'Todos os campos são <bold>obrigatórios!</bold>'})
    }

    try{
        await Usuario.create(valores)
        res.status(200).json({message: 'Usuário cadastrado com sucesso!'})
    }catch(err){
        console.error('Erro ao cadastrar o usuário!',err)
        res.status(500).json({message: 'Erro ao cadastrar o usuário!'})
    }
}
const consultar = async (req,res)=>{
    const id = req.params.id
    console.log('Código do usuário = ', id)

    if(!id){
        return res.status(400).json({message: 'o código do usuário é <bold>obrigatório!</bold>'})
    }
    
    
    try{
        const usuario = await Usuario.findByPk(id)
        if(!usuario){
            return res.status(404).json({message: 'O usuário não foi encontrado!'})
        }
        res.status(200).json(usuario)

    }catch(err){
        res.status(500).json({message: 'Erro ao consultar o usuário!'})
        console.error('Erro ao consultar o usuário!',err)
    }
}
const listar = async (req,res)=>{
    try{
        const dados = await Usuario.findAll()
        res.status(200).json(dados)
    }catch(err){
        res.status(500).json({message: 'Erro ao listar o usuário!'})
        console.error('Erro ao listar o usuário!',err)
    }
}
const atualizar = async (req,res)=>{
    const id = req.params.id
    console.log('Código do usuário = ', id)
    const valores = req.body
    console.log(valores)

    if(!id){
        return res.status(400).json({message: 'O código do usuário é <bold>obrigatório!</bold>'})
    }
    if(!valores){
        return res.status(400).json({message: 'Todos os campos são <bold>obrigatórios!</bold>'})
    }
    try{
        const usuario = await Usuario.findByPk(id)

        if(!usuario){
            return res.status(404).json({message: 'O usuário não foi encontrado!'})
        }

    await Usuario.update(valores,{where: {codUsuario: id}})

    const dados = await Usuario.findByPk(id)
    

        
        res.status(200).json(dados)
    }catch(err){
        res.status(500).json({message: 'Erro ao consultar o usuário!'})
        console.error('Erro ao consultar o usuário!',err)
    }
}
const apagar = async (req,res)=>{
    const id = req.params.id
    console.log('Código do usuário = ', id)

    if(!id){
        return res.status(400).json({message: 'o código do usuário é <bold>obrigatório!</bold>'})
    }
    
    
    try{
        const usuario = await Usuario.findByPk(id)
        if(!usuario){
            return res.status(404).json({message: 'O usuário não foi encontrado!'})
        }

        await Usuario.destroy({where: {codUsuario: id}})

        res.status(200).json({message: 'Usuário apagado com sucesso!'})

    }catch(err){
        res.status(500).json({message: 'Erro ao apagar o usuário!'})
        console.error('Erro ao apagar o usuário!',err)
    }
}

module.exports = { cadastrar, consultar, listar, atualizar, apagar }