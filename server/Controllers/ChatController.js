const Chat = require("../database/models/Chat")
const Owner = require('../database/models/Owner');
const User = require('../database/models/User');
const getMessages=async(req,res) =>{
    try {
        const { userId, ownerId } = req.params;

        const chats = await Chat.findAll({
            where: {
                userId,
                ownerId
            },
            include: [
                { model: Owner, as: 'Owner' },
                { model: User, as: 'User' }
            ]
        });
        res.status(200).json(chats);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
const addMessage=async(req,res)=>{
    try {
        const { userId, ownerId } = req.params;
        const { message } = req.body;

        const newChat = await Chat.create({ message, userId, ownerId });
        res.status(201).json(newChat);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
module.exports={getMessages,addMessage}