const express = require('express')
const routers = express.Router()
const product = require('./product');
const auth = require('./auth');

routers.use('/product', product)
routers.use('/auth', auth)


module.exports = routers