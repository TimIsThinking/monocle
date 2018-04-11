const express = require('express')
const verifyToken = require('../middleware/verifyToken')
var authController = require('../controllers/auth');
const router = express.Router()

// router.post('/posts', verifyToken, authController.posts)
router.post('/login', authController.login)

module.exports = router