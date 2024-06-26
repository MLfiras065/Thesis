const { Wishlist } = require('../models');

exports.addToWishlist = async (req, res) => {
    try {
        const { userId, productId, productName } = req.body;
        const newItem = await Wishlist.create({ userId, productId, productName });
        res.status(201).json(newItem);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getWishlist = async (req, res) => {
    try {
        const { userId } = req.params;
        const wishlist = await Wishlist.findAll({ where: { userId } });
        res.status(200).json(wishlist);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.removeFromWishlist = async (req, res) => {
    try {
        const { id } = req.params;
        await Wishlist.destroy({ where: { id } });
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
