const { DataTypes } = require('sequelize');
const sequelize = require('../db');
const User=require('../models/User');
const Post=require("../models/post")
const comment = sequelize.define("comment", {
    content: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
    },
    userid:{
      type:DataTypes.INTEGER
    },
    postid:{
      type:DataTypes.INTEGER
    }

  });
  Post.hasMany(comment,{foreignKey:"commentid",as:"Post"})
  comment.belongsTo(Post,{foreignKey:"commentid",as:"Post"})
  User.hasMany(comment,{foreignKey:"userid",as:"comment"})
  comment.belongsTo(User,{foreignKey:"userid",as:"User"})
  module.exports=comment