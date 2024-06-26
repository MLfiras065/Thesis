const express = require("express")
const router = express.Router()
const WishController = require("../Controllers/WishController")

router.post("/",WishController.addToWishlist)
router.get("/:userId",WishController.getWishlist)
router.delete("/:id",WishController.removeFromWishlist)


module.exports = router