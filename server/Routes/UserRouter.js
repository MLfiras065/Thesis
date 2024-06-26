const route =require('express').Router()

const {getUser,register,login,updateUser,getUserEmail,markAsPayed}=require('../Controllers/UserController')
const autoriser = require('../Middelware/Owner')
route.get('/get',autoriser,getUser)
route.get('/:email',autoriser,getUserEmail)
route.post('/reg',register)
route.post("/log/:email",login)
route.put("/upd/:id",autoriser,updateUser)
route.get("/payed/:id",markAsPayed)
module.exports=route