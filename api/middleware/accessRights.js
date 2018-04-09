const jwt = require('jsonwebtoken')

function checkIfAdmin(req, res, next) {
    const token = req.token

    if (typeof token !== 'undefined') {

        const decoded = jwt.decode(token)
        decoded.user.admin
        ? next()
        : res.status(401).json({
            message: 'Unauthorized'
        })
    } else {
        res.status(403).json({
            message: 'No authorization token'
        })
    }
}

module.exports = checkIfAdmin