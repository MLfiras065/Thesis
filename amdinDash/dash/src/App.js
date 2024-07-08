const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const ownerRoutes = require('./route/OwnerRoutes');
const clientRoutes = require('./route/lientRoutes');
const productRoutes = require('./route/ProductRoutes');
const profileRoutes = require('./route/ProfileRoutes');


app.use(bodyParser.json());


app.use('/api/owners', authenticate, ownerRoutes);
app.use('/api/clients', authenticate, clientRoutes);
app.use('/api/products', authenticate, productRoutes);
app.use('/api/profile', authenticate, profileRoutes);

module.exports = app;
