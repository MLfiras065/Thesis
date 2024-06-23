const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Comment = sequelize.define("Owner", {
    content: {
    type: DataTypes.STRING(45),
    allowNull: false
  },

  });

module.exports=Comment
