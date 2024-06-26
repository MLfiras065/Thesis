const express = require("express")
const router = express.Router()
const ChatController = require("../Controllers/ChatController")

router.get("/message",ChatController.getMessages)
router.post("/message",ChatController.postMessages)

module.exports = router
