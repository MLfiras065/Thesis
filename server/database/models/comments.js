const { DataTypes } = require('sequelize');
const User = require('./User');
const Property = require('./property');
const sequelize = require('../db');

const Comment = sequelize.define('comment', {

  content: {
    type: DataTypes.STRING(45),
    allowNull: false
  },
  idProperty: {
    type: DataTypes.INTEGER,
   
    allowNull: false
  },
  userId: {
    type: DataTypes.INTEGER,
   
    allowNull: false
  }
});

Property.hasMany(Comment, { foreignKey: "idProperty", as: "comments" });
Comment.belongsTo(Property, { foreignKey: "idProperty", as: "property" });

User.hasMany(Comment, { foreignKey: "userId", as: "comments" });
Comment.belongsTo(User, { foreignKey: "userId", as: "user" });

module.exports = Comment;
