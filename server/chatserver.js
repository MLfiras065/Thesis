const express = require('express');
const http = require('http');
const sequelize = require('../server/database/db');
const chatRoutes = require('../server/Routes/ChatRouter');

const app = express();
const server = http.createServer(app);



app.use(express.json());


app.use('/api', chatRoutes);




const PORT = process.env.PORT || 3000;
sequelize.sync().then(() => {
  server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
