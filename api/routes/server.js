const express = require('express')
const serverController = require('../controllers/server');
const router = express.Router()

router.get('/', serverController.list_servers)
router.get('/start/:server_id', serverController.start_server)
router.get('/stop/:server_id', serverController.stop_server)
router.get('/:server_id', serverController.get_server_state)

router.post('/create', serverController.create_server)

module.exports = router