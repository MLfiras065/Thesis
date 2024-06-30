const router =require('express').Router()
const {logIn}=require('../Controllers/AuthController')
router.post('/login', logIn);
module.exports=router