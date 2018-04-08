const serverRoutes = require('./server')
const authRoutes = require('./auth')
const userRoutes = require('./user')

module.exports = function (app) {
    app.use('/servers', serverRoutes)
    app.use('/auth', authRoutes)
    app.use('/users', userRoutes)
}