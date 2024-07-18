const express = require("express")
const router = express.Router()
const {addMessage,getMessages,getRooms} = require("../Controllers/ChatController")

router.get("/getmsg/:userId/:ownerId",getMessages)
router.post("/addmsg/:userId/:ownerId",addMessage)
router.post('/getRoom',getRooms)

module.exports = router
