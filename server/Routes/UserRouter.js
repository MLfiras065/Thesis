const route =require('express').Router()
const {getUser,register,login,updateUser,getUserEmail}=require('../Controllers/UserController')
route.get('/get',getUser)
route.get('/:email',getUserEmail)
route.post('/reg',register)
route.post("/log/:email",login)
route.put("/upd/:id",updateUser)
module.exports=route