const { DataTypes } = require('sequelize');
const sequelize = require('../db');
const product = require('./product');
const reviews=sequelize.define("reviews",{
    content:{
        type:DataTypes.TEXT
    },
boughtby:{
    type:DataTypes.INTEGER
}

})
product.hasMany(reviews,{foreignKey:"productid"})
reviews.belongsTo(product,{foreignKey:"productid"})
module.exports=reviews