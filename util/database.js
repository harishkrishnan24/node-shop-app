const Sequelize = require('sequelize');

const sequelize = new Sequelize('ecommerce-app', 'root', 'rootuser', {
  dialect: 'mysql',
  host: 'localhost'
});

module.exports = sequelize;
