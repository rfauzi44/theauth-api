const express = require('express')
const routers = express.Router()
const ctrl = require('../controllers/auth')
const auth = require('../middlewares/auth');

routers.post('/register', ctrl.register)
routers.post('/login', ctrl.login)
routers.get('/me', auth.login, ctrl.me)


module.exports = routers