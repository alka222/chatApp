const Sequelize = require('sequelize');

const sequelize = require('../util/database')

const Usergroup = sequelize.define('usergroup' , {
    id:{
        type:Sequelize.INTEGER,
        unique:true,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true,
    }

})

module.exports = Usergroup;