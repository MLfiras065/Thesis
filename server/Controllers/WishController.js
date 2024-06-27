// const { Wishlist } = require('../database/models/Wishlist');
// const User = require('../database/models/User');
// const Property = require('../database/models/property');
// exports.addToWishlist = async (req, res) => {
//     try {
//         const { userId, propertyId } = req.body;
//         const wishlist = await Wishlist.create({ userId, propertyId });
//         res.status(201).json(wishlist);
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// };

// exports.getWishlist = async (req, res) => {
//     try {
//         const { userId } = req.params;
//         const wishlist = await Wishlist.findAll({
//             where: { userId },
//             include: [
//                 { model: Property, as: 'property' }
//             ]
//         });
//         res.status(200).json(wishlist);
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// };

// exports.removeFromWishlist = async (req, res) => {
//     try {
//         const { userId, propertyId } = req.body;
//         await Wishlist.destroy({
//             where: { userId, propertyId }
//         });
//         res.status(200).json({ message: 'Property removed from wishlist' });
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// };
