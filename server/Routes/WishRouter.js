const express = require("express");
const router = express.Router();
const WishController = require("../Controllers/WishController");

router.post("/add/:UserId/:PropertyId", WishController.addToWishlist);
router.get("/get/:id", WishController.getWishlist);
router.delete("/del/:UserId", WishController.removeFromWishlist);

module.exports = router;
