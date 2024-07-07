const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Owner = sequelize.define('Owner', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },

});

module.exports = Owner;
