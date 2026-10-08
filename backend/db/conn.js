const { Sequelize } = require('sequelize')

const db = new Sequelize('db_sistema_web','root','senai',{
    port: 3306,
    host: 'localhost',
    dialect: 'mysql',
})

module.exports = db