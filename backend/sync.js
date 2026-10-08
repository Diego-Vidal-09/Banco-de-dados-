const {Produto, Usuario} = require('./models/relacionamento')
const conn = require('./db/conn')

async function syncDataBase(){
    try{
        await conn.sync({force: true})
        console.log('Banco de dados Sincronizado com sucesso!')
    }catch(err){
        console.error('Erro ao Sincrozinar com o Banco de Dados!',err)
    }finally{
        await conn.close()
        console.log('Fechando a conexão com o Banco!')
    }
}
syncDataBase()