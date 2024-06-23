const { DataTypes } = require('sequelize');
const sequelize = require('../db');
const User=require('../models/User')
const message = sequelize.define("message", {
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    readed: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    senderId:{
      type:DataTypes.INTEGER
    },
    reciverId:{
      type:DataTypes.INTEGER
    }
  });
 
  module.exports=message