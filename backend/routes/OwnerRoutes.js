const express = require('express');
const router = express.Router();
const ownerController = require('../controllers/ownerController');

router.get('/owners', ownerController.getAllOwners);
router.post('/owners', ownerController.createOwner);
router.delete('/owners/:id', ownerController.deleteOwner);
router.put('/owners/:id', ownerController.updateOwner);

module.exports = router;
