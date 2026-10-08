const Produto = require('./produto')
const Usuario = require('./usuario')

Usuario.hasMany(Produto,{
    foreignKey: 'idUsuario',
    as: 'produtoUsuario',
    onDelete: 'CASCADE'
})
Produto.belongsTo(Usuario,{
    foreignKey: 'idUsuario',
    as: 'usuarioProduto',
    allowNull: false
})

module.exports = { Usuario, Produto }