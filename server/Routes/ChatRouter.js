const express = require("express")
const router = express.Router()
const {addMessage,getMessages} = require("../Controllers/ChatController")

router.get("/getmsg/:userId/:ownerId",getMessages)
router.post("/addmsg/:userId/:ownerId",addMessage)

module.exports = router
