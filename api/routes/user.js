const express = require('express')
const userController = require('../controllers/user');
const router = express.Router()
const verifyToken = require('../middleware/verifyToken')
const checkIfAdmin = require('../middleware/accessRights')

router.get('/', verifyToken, checkIfAdmin, userController.listUsers)
router.get('/:user_id', verifyToken, checkIfAdmin, userController.getUser)

router.post('/create', verifyToken, checkIfAdmin, userController.create)

module.exports = router