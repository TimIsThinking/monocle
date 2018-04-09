const User = require('../models/user')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

exports.posts = (req, res) => {
    jwt.verify(req.token, process.env.SECRET, (err, authData) => {
        if (err) {
            res.status(403).send()
        } else {
            res.json({
                authData
            })
        }
    })
}

exports.login = (req, res) => {

    User.findOne({ name: req.body.name }, '_id name email password admin', (err, user) => {
        if (err) return res.status(503).send(err)

        let userData = {
            id: user._id,
            name: user.name,
            email: user.email
        }

        if (user.admin) userData.admin = user.admin

        bcrypt.compare(req.body.password, user.password, (err, passRes) => {
            if (passRes) {

                jwt.sign({user: userData}, process.env.SECRET, { expiresIn: 3600 }, (err, token) => {
                    res.json({
                        token
                    })
                })
            } else {
                res.json({ success: false, message: 'Authentication failed. Wrong password.' })
            }
        })
    })
}