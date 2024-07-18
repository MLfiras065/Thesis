const { DataTypes } = require('sequelize');
const sequelize = require('../db');
const Owner=require('./Owner')
const Property = sequelize.define("Property", {
  Name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  Price: {
    type: DataTypes.STRING,
    allowNull: false
  },
  image: {
    type: DataTypes.JSON,
    allowNull: true,
  
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
    
  },
  category: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue:""
  },
  Booked: {
    type: DataTypes.TINYINT,
    allowNull: true,
    defaultValue: 0
  },
  rating: {
    type: DataTypes.DECIMAL(0, 0),  
  
  },
  ownershpImg: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue:""
  },
Bathroom:{
  type:DataTypes.STRING,
  allowNull:true
},
Bedroom:{
  type:DataTypes.STRING,
  allowNull:true
},
person:{
  type:DataTypes.STRING,
  allowNull:true
},
Ac:{
  type:DataTypes.STRING,
  allowNull:true
},
Pool:{
  type:DataTypes.STRING,
allowNull:true
},
  location: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

module.exports = Property;