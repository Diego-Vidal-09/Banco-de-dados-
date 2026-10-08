const { DataTypes, Sequelize } = require('sequelize')
const db = require('../db/conn')

const Produto = db.define('Produto',{
    codProduto: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    idUsuario:{
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            key: 'codUsuario',
            model: 'usuarios'
        }
    },
    nomeProduto: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    categoria: {
        type: DataTypes.ENUM('SOCIAL','CASUAL'),
        allowNull: false
    },
    precoUnitario: {
        type: DataTypes.DECIMAL(10,2),
        allowNull: false
    },
    qtdeEstoque: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    data: {
        type: DataTypes.DATEONLY,
        allowNull: false
    }
},{
    timestamps: false,
    tableName: 'Produtos'
})

module.exports = Produto