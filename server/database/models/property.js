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
    allowNull: true
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  category: {
    type: DataTypes.STRING,
    allowNull: true
  },
  Booked: {
    type: DataTypes.TINYINT,
    allowNull: true,
    defaultValue: 0
  },
  rating: {
    type: DataTypes.DECIMAL(3, 2),  
    allowNull: true
  },
  ownershpImg: {
    type: DataTypes.STRING,
    allowNull: true
  },
  extra: {
    type: DataTypes.STRING,
    allowNull: true
  },
  location: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

// Owner.hasMany(Property,{foreignKey:"ownerid",as:"Property"})
// Property.belongsTo(Owner,{foreignKey:"ownerid",as:"Owner"})

module.exports = Property;