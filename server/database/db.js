const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("thesis", "root", "Aymen@2003", {
  host: "127.0.0.1",
  dialect: "mysql",
});
sequelize
  .query("CREATE DATABASE IF NOT EXISTS thesis ")
  .then(() => {
    console.log("data exist");
  })
  .catch((err) => console.log(err));

module.exports=sequelize 