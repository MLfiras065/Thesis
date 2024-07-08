const { DataTypes } = require('sequelize');
const sequelize = require('../db');
const Property = require('./property');
const User = require('./User');

const UserRating = sequelize.define('UserRating', {
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User, // Referencing the User model
      key: 'id'
    }
  },
  propertyId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Property, // Referencing the Property model
      key: 'id' 
    }
  },
  rating: {
    type: DataTypes.DECIMAL(3, 2),
    allowNull: false,
  },
}, {
  indexes: [
    {
      unique: true,
      fields: ['userId', 'propertyId']
    }
  ]
});

Property.hasMany(UserRating, { foreignKey: 'propertyId', as: 'ratings' });
UserRating.belongsTo(Property, { foreignKey: 'propertyId', as: 'property' });
User.hasMany(UserRating, { foreignKey: 'userId', as: 'ratings' });
UserRating.belongsTo(User, { foreignKey: 'userId', as: 'user' });

module.exports = UserRating;
