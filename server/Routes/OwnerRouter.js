const route =require('express').Router()
const {getOwner,register,login,updateOwner,getOwnerEmail,markeAsPayed}=require('../Controllers/OwnerController')

const autoriser = require('../Middelware/Owner')
route.get('/getOwner',autoriser,getOwner)
route.get('/:email',getOwnerEmail)
route.post('/reg',register)
route.post("/log/:email",login)
route.put("/upd/:id",autoriser,updateOwner)
route.put("/payed/:id",markeAsPayed)
module.exports=route