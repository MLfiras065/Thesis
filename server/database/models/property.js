const { DataTypes } = require('sequelize');
const sequelize = require('../db');
const User=require('./User')
const property = sequelize.define("property", {
    name: {
      type: DataTypes.STRING,  
    },
    price: {
      type: DataTypes.INTEGER,
    },
    images: {
      type: DataTypes.STRING,
    },
    description: {
      type: DataTypes.STRING,
    }, 
    category:{
      type: DataTypes.STRING,
    },
    booked:{
type:DataTypes.BOOLEAN,
defaultValue:false
    }
  });
  
  User.hasMany(property,{foreignKey:"userid",as:"property"})
 property.belongsTo(User,{foreignKey:"userid",as:"User"})
  module.exports=property