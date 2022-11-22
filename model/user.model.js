const Sequelize = require('sequelize');
const sequelize = require('../utils/database');


const User = sequelize.define('user', {

    email: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
})

module.exports = User;


















