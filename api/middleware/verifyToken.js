const jwt = require('jsonwebtoken')

function verifyToken(req, res, next) {
    const bearerHeader = req.headers['authorization']

    if (typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split(' ')
        const bearerToken = bearer[1]

        jwt.verify(bearerToken, process.env.SECRET, (err, authData) => {
            if (err) {
                res.status(403).json({
                    message: 'Token expired'
                })
            } else {
                req.token = bearerToken
                next()
            }
        })
    } else {
        res.status(403).json({
            message: 'No authorization token'
        })
    }
}

module.exports = verifyToken