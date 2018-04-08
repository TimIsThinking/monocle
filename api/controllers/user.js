const bcrypt = require('bcrypt')
const User = require('../models/user');

exports.register = (req, res) => {

    const hashedPassword = bcrypt.hashSync(req.body.password, 8)

    const user = {
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
    }

    User.create(user, (err, user) => {
        if (err) return res.status(500).send("There was a problem adding the information to the database.");
        res.status(200).send({
            id: user._id,
            name: user.name,
            email: user.email
        });
    })

}