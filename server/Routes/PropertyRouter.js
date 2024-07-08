const express = require('express');
const router = express.Router();
const { getAllProperties, getProperty, getOwnerProperty, createProperty, updateProperty, deleteProperty, rateProperty, getPropertyRating } = require('../Controllers/PropertyController');

router.get('/getAll', getAllProperties);
router.get('/getone/:id', getProperty);
router.get('/getAll/:ownerid', getOwnerProperty); 
router.post('/post/:ownerid', createProperty);
router.put('/update/:id', updateProperty);
router.delete('/delet/:id', deleteProperty);
router.post('/rate/:userId/:propertyId', rateProperty); 
router.get('/rate/:propertyId', getPropertyRating); // New endpoint to get average rating

module.exports = router;
