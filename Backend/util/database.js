const Sequelize = require('sequelize');

const sequelize = new Sequelize ( 'chatapp' , 'root' , 'node-database' ,{
    dialect:'mysql',
    host:'localhost'
})

module.exports = sequelize ;