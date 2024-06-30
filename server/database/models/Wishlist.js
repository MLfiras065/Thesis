const { DataTypes } = require('sequelize');
const sequelize = require('../db');
const User = require('./User');
const property=require('./property')
const Wishlist = sequelize.define('Wishlist', {
//   userId: {
//     type: DataTypes.INTEGER, 
//     allowNull: false,
//     references: {
//       model: User,
//       key: 'id'
//     }
// },

});
// User.hasMany(property);
// property.belongsTo(User,{ through:'wishlists' });
module.exports = Wishlist;
