const Wishlist = require("../database/models/Wishlist");
const User = require("../database/models/User");
const Property = require("../database/models/property");

exports.addToWishlist = async (req, res) => {
  try {
    const { UserId, PropertyId } = req.body;
    const wishlist = await Wishlist.create({ UserId, PropertyId });
    res.status(201).json(wishlist);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getWishlist = async (req, res) => {
  try {
    const wishlist = await User.findAll({
      include: [{ model:Property }],where:{id:req.params.id}
    });
    res.status(200).json(wishlist);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.removeFromWishlist = async (req, res) => {
  try {
    const { UserId } = req.params;
    console.log("req.params", req.params.id);
    await Wishlist.destroy({ where: { UserId } });
    res.status(200).json({ message: "Property removed from wishlist" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
