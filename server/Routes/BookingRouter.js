const express = require("express");
const router = express.Router();
const BookingController = require("../Controllers/BookingController");

router.post("/add/:UserId/:PropertyId", BookingController.addToBooking);
router.get("/get/:UserId", BookingController.get);
router.get("/get", BookingController.getBooking);
router.delete("/del/:UserId", BookingController.removeFromBooking);

module.exports = router;
