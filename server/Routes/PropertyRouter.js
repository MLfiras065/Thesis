const express = require('express');
const router = express.Router();
const { getAllProperties, getProperty, createProperty, updateProperty, deleteProperty } = require('../Controllers/PropertyController');


router.get('/getAll', getAllProperties);

router.get('/getone/:id', getProperty);

router.post('/post', createProperty);

router.put('/update/:id', updateProperty);

router.delete('/delet/:id', deleteProperty);

module.exports = router;
