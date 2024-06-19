const { DataTypes } = require('sequelize');
const sequelize = require('../db');


const User = sequelize.define("User", {
  image: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  coverimage: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  FirstName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  LastName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  username: {
    type: DataTypes.STRING,
    allownull: false,
    unique: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  Password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  DateOfBirth: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  gender: {
    type: DataTypes.STRING,
    allowNull: false,
  },


});

module.exports=User