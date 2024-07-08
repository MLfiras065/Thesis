const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profileController');


router.get('/profile/:id', profileController.getProfileById);
router.put('/profile/:id', profileController.updateProfile);

module.exports = router;
