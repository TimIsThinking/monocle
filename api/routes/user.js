const express = require('express')
const verifyToken = require('../middleware/verifyToken')
const userController = require('../controllers/user');
const router = express.Router()

// Disable registrations for now
// router.post('/register', userController.register)

module.exports = router