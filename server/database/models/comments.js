const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Comment = sequelize.define("comment", {
    content: {
    type: DataTypes.STRING(255),
    allowNull: false
  },

  });

module.exports=Comment
