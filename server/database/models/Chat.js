const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Chat = sequelize.define('Chat', {
  user: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  message: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Chat;
