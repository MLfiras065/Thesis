const { DataTypes } = require('sequelize');
const sequelize = require('../db');
const Property =require("./property");

const Owner = sequelize.define("Owner", {
  image: {
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
  CINImage:{
    type:DataTypes.STRING,
    allowNull:false
  },role:{
    type:DataTypes.STRING,
    defaultValue:"owner"

  }, PhoneNumber:{
    type:DataTypes.STRING,
   
  }
  
});
// Owner.hasMany(Property,{foreignKey:"ownerid",as:"Property"})
// Property.belongsTo(Owner,{foreignKey:"ownerid",as:"Owner"})

module.exports=Owner
