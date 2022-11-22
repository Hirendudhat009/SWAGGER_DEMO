const Sequelize = require('sequelize');
const sequelize = require('../utils/database');


const UserDetail = sequelize.define('user-detail', {
    firstname: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    lastname: {
        type: Sequelize.STRING,
        allowNull: false
    },
    age: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    city: {
        type: Sequelize.STRING,
        allowNull: false
    },
})

module.exports = UserDetail;


















