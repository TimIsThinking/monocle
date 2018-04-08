const mongoose = require('mongoose');

const Server = mongoose.model('Server', { 
    name: {
        type: String,
        required: true,
        unique: true
    },
    serviceName: {
        type: String,
    },
    address: {
        type: String,
        required: true
    },
    port: {
        type: String,
        required: true
    }
});

module.exports = Server