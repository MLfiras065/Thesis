const express = require('express');
const router = express.Router();
const { getAllProperties, getProperty, getOwnerProperty, createProperty, updateProperty, deleteProperty, addExtra,addImages, rateProperty, getPropertyRating,up } = require('../Controllers/PropertyController');

router.get('/getAll', getAllProperties);
router.get('/getone/:id', getProperty);
router.get('/getAll/:id', getOwnerProperty);
router.post('/post/:ownerid',createProperty);

router.put('/image/:id', addImages);
router.put('/extra/:id', addExtra);
router.put('/update/:id', updateProperty);
router.delete('/delet/:id', deleteProperty);
router.post('/rate/:userId/:propertyId', rateProperty); 
router.get('/rate/:propertyId', getPropertyRating); 
router.put('/up/:id',up)

module.exports = router;
