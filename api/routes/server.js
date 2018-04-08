const express = require('express')
const serverController = require('../controllers/server');
const verifyToken = require('../middleware/verifyToken')
const router = express.Router()

router.get('/', verifyToken, serverController.list_servers)
router.get('/state', verifyToken, serverController.get_server_state)
router.get('/start', verifyToken, serverController.start_server)
router.get('/stop', verifyToken, serverController.stop_server)
router.get('/:server_id', verifyToken, serverController.get_server_state)

router.post('/create', verifyToken, serverController.create_server)

module.exports = router