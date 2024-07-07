const { DataTypes } = require('sequelize');
const sequelize = require('../db');
const User = require('./User');
const Property=require('./property')
const Wishlist = sequelize.define('Wishlist', {
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
User.belongsToMany(Property, { through:Wishlist, foreignKey: 'UserId' });
Property.belongsToMany(User, { through:Wishlist, foreignKey: 'PropertyId' });
module.exports = Wishlist;
