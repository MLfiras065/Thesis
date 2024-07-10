const express = require("express")
const router = express.Router()
const {addMessage,getMessages} = require("../Controllers/ChatController")
const { getRooms } = require("../Controllers/RoomsController")

router.get("/getmsg/:userId/:ownerId",getMessages)
router.post("/addmsg/:userId/:ownerId",addMessage)
router.get('/getRoom/:userid',getRooms)

module.exports = router
