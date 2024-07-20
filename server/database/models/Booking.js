const { DataTypes } = require('sequelize');
const sequelize = require('../db');
const User = require('./User');
const Property=require('./property')
const Booking = sequelize.define('Booking', {
    checkIn:{
        type:DataTypes.STRING,
        primaryKey: true,
    },
    checkOut:{
        type:DataTypes.STRING,
        primaryKey: true,
    },
    UserId: {
        type: DataTypes.INTEGER,
        references: {
          model: User,
          key: 'id'
        },
        allowNull: false
      },
      PropertyId: {
        type: DataTypes.INTEGER,
        references: {
          model: Property,
          key: 'id'
        },
        allowNull: false
      }

});
User.belongsToMany(Property, { through:Booking, foreignKey: 'UserId' });
Property.belongsToMany(User, { through:Booking, foreignKey: 'PropertyId' });
module.exports = Booking;
