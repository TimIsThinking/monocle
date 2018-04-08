const mongoose = require('mongoose');

const User = mongoose.model('User', { 
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    admin: {
        type: Number
    }
});

module.exports = User