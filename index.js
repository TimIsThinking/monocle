const dotenv = require('dotenv')
dotenv.config()
const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose');
const {
    serverRoutes,
    authRoutes,
    userRoutes
} = require('./api/routes')

mongoose.connect(process.env.MONGODB_URL)

const app = express()

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

require('./api/routes')(app)

const port = process.env.PORT || 3000;

app.listen(port, () => console.log('Monocle RESTful API server started on: ' + port));
