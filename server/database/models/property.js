const { DataTypes } = require('sequelize');
const sequelize = require('../db');
const Owner=require('./Owner')
const Property = sequelize.define("Property", {
  Name: {
    type: DataTypes.STRING(45),
    allowNull: false
  },
  Price: {
    type: DataTypes.STRING(45),
    allowNull: false
  },
  image: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  category: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  Booked: {
    type: DataTypes.TINYINT,
    allowNull: false,
    defaultValue: 0
  },
  rating: {
    type: DataTypes.DECIMAL(3, 2),  
    allowNull: false
  },
  ownershpImg: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  extra: {
    type: DataTypes.STRING,
    allowNull: false
  },
  location: {
    type: DataTypes.STRING(45),
    allowNull: false
  }
});
Owner.hasMany(Property,{foreignKey:"ownerid",as:"property"})
Property.belongsTo(Owner,{foreignKey:"ownerid",as:"Owner"})

module.exports = Property;