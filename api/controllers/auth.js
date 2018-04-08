const User = require('../models/user')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

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

    console.log('LOGIN')

    User.findOne({ name: req.body.name }, '_id name email password', (err, user) => {
        if (err) return res.status(503).send(err)

        console.log('user', user)
        console.log(req.body.password, user.password)

        userData = {
            id: user._id,
            name: user.name,
            email: user.email
        }

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