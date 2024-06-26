const chat = require("../database/models/Chat")

exports.getMessages = (req,res) =>{
    chat.findAll()
    .then(messages=>{
        res.json(messages)
    })
   .catch(error=>{
    res.status(500).send(error.message)
   })
}

exports.postMessages= (req,res)=>{
    const{user,message}=req.body
    chat.create({user,message})
    .then(newMessage=>{
        res.status(201).json(newMessage)
    })
    .catch(error=>{
        res.status(500).send(error.message)
    })
}