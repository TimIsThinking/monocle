const serverRoutes = require('./server')
const authRoutes = require('./auth')
const userRoutes = require('./user')
const verifyToken = require('../middleware/verifyToken')
const checkIfAdmin = require('../middleware/accessRights')

module.exports = function (app) {
    app.use('/servers', verifyToken, checkIfAdmin, serverRoutes)
    app.use('/auth', authRoutes)
    app.use('/users', userRoutes)
}