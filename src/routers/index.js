const express = require('express');
const routers = express.Router();
const product = require('./product');
const auth = require('./auth');

// Route for the root path '/'
routers.get('/', (req, res) => {
  const htmlContent = `
    <html>
      <head>
        <title>Welcome to vehicle-rental-api!</title>
      </head>
      <body>
        <p>Hello World! This is theauth-api. You can check Postman Documentation <a href="https://documenter.getpostman.com/view/25042327/2s93Y3vLw1">here</a></p>
      </body>
    </html>
  `;
  res.header("Content-Type",'text/html');
  res.send(htmlContent);
});

routers.use('/product', product);
routers.use('/auth', auth);

module.exports = routers;
