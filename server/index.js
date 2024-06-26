const express = require("express");
const sequelize=require("./database/db")
const WishRouter = require("./Routes/WishRouter")

const  cors = require('cors')



app.use('/api/wishlist', WishRouter)


const app = express();
app.use(cors());
const PORT = process.env.PORT ||4000
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/../client/dist"));

const initApp = async () => {
    console.log("Testing the database connection..");

    try {
        await sequelize.sync()
        console.log("Connection has been established successfully.");

        app.listen(PORT, () => {
            console.log(`Server is up and running at: http://localhost:${PORT}`);
        });
    } catch (error) {
        console.log( error);
    }
};

initApp()



