const express = require('express');
const router = express.Router();
const clientController = require('../controllers/clientController');


router.get('/clients', clientController.getAllClients);
router.post('/clients', clientController.createClient);
router.delete('/clients/:id', clientController.deleteClient);
router.put('/clients/:id', clientController.updateClient);

module.exports = router;
