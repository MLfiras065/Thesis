const express = require("express");
const sequelize=require("./database/db")


const  cors = require('cors')




// const wishlist=require('./Routes/WishRouter')
const user=require('./Routes/UserRouter')
const auth=require('./Routes/AuthRouter')
const owner=require('./Routes/OwnerRouter')
const property=require('./Routes/PropertyRouter')
const payment=require('./Routes/PaymentRouter')
const app = express();
app.use(cors());
const PORT = process.env.PORT ||4000
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/../client/dist"));

// app.use('/api/wishlist', wishlist)
app.use('/api/user',user)
app.use('/api/Auth',auth)
app.use('/api/owner',owner)
app.use('/api/property',property)
app.use('/api/',payment)
const initApp = async () => {
    console.log("Testing the database connection..");

    try {
        await sequelize.sync({alter:true})
        console.log("Connection has been established successfully.");

        app.listen(PORT, () => {
            console.log(`Server is up and running at: http://localhost:${PORT}`);
        });
    } catch (error) {
        console.log( error);
    }
};

initApp()



