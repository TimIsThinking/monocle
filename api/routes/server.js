const express = require('express')
const serverController = require('../controllers/server');
const verifyToken = require('../middleware/verifyToken')
const router = express.Router()

router.get('/', verifyToken, serverController.get_server_state)
router.get('/start', verifyToken, serverController.start_server)
router.get('/stop', verifyToken, serverController.stop_server)

module.exports = router