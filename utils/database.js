const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('data', 'root','',{
    dialect: 'mysql',
    host: 'localhost',
    logging:false
})
module.exports = sequelize;




