const { DataTypes } = require('sequelize');
const sequelize = require('../db');
const User = require('./User');
const Owner = require('./Owner');
const Rooms=sequelize.define("Rooms",{

})
Owner.hasMany(Rooms,{foreignKey:"ownerId",as:"rooms"})
Rooms.belongsTo(Owner,{foreignKey:"ownerId",as:"owner"})
User.hasMany(Rooms,{foreignKey:"userId",as:"rooms"})
Rooms.belongsTo(User,{foreignKey:"userId",as:"user"})