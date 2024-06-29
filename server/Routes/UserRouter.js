const route =require('express').Router()

const {getUser,register,login,updateUser,getUserEmail,markAsPayed}=require('../Controllers/UserController')
const autoriser = require('../Middelware/Owner')
route.get('/get',getUser)
route.get('/:email',getUserEmail)
route.post('/reg',register)
route.post("/log/:email",login)
route.put("/upd/:id",autoriser,updateUser)
route.get("/payed/:id",markAsPayed)
module.exports=route