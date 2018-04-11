const bcrypt = require('bcryptjs')
const User = require('../models/user');

create = (req, res) => {

    const hashedPassword = bcrypt.hashSync(req.body.password, 8)

    const user = {
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
    }

    User.create(user, (err, user) => {
        if (err) return res.status(500).send("There was a problem adding the user to the database.");
        res.status(200).send({
            id: user._id,
            name: user.name,
            email: user.email
        });
    })
}

getUser = (req, res) => {
    User.findOne({ _id: req.params.user_id }, (err, user) => {
        if (err) return res.status(404).json({
          message: "No user exists with this ID."
        });

        res.status(200).json(user);
    })
}

listUsers = (req, res) => {
    User.find({}, (err, users) => {
        if (err) return res.status(500).json({
          message: "No user exists with this ID."
        });

        res.status(200).send(users.map(user => ({
            id: user._id,
            name: user.name,
            email: user.email
        })));
    })
}

module.exports = {
    create,
    getUser,
    listUsers
}