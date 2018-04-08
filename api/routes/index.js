const serverRoutes = require('./server')
const authRoutes = require('./auth')
const userRoutes = require('./user')
const verifyToken = require('../middleware/verifyToken')

module.exports = function (app) {
    app.use('/servers', verifyToken, serverRoutes)
    app.use('/auth', authRoutes)
    app.use('/users', userRoutes)
}