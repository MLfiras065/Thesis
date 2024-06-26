const { DataTypes } = require('sequelize');
const sequelize = require('../db');
const post=require('../models/post');
const comment = require('./comment');

const likes = sequelize.define("likes", {
  numberOfLikes:{
    type:DataTypes.INTEGER
  }
  });
  comment.hasMany(likes,{foreignKey:"commentid",as:"like"})
  likes.belongsTo(comment,{foreignKey:"commentid"})
  post.hasMany(likes,{foreignKey:"postid",as:"likes"})

  likes.belongsTo(post,{foreignKey:"postid",as:"post"})
  module.exports=likes