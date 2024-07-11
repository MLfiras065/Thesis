const Booking = require("../database/models/Booking");
const User = require("../database/models/User");
const Property = require("../database/models/property");

exports.addToBooking = async (req, res) => {
  console.log("test");
  try {
    // const { UserId, PropertyId,CheckIn,CheckOut } = req.body;
    console.log(req.body);
    const booking = await Booking.create(req.body);
    res.status(201).json(booking);
  } catch (error) {
    console.log("err",error);
    res.status(500).json({ error: error });
  }
};

exports.getBooking = async (req, res) => {
  try {
    const booking = await Booking.findAll();
    res.status(200).json(booking);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
exports.get = async (req, res) => {
  try {
    const booking = await Booking.findAll({
    where:{UserId:req.params.UserId}
    });
    // const propertyIds = booking.map(booking => booking.propertyId);
    res.status(200).json(booking,
      // propertyIds
    );
    
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
exports.removeFromBooking = async (req, res) => {
  try {
    const { UserId } = req.params;
    console.log("req.params", req.params.id);
    await Booking.destroy({ where: { UserId } });
    res.status(200).json({ message: "Property removed from Booking" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
