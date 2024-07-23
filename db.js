const mongoose = require('mongoose')
require('dotenv').config();

// define the mongodb connection url
// const mongoURL = 'mongodb://127.0.0.1:27017/hotels'
// const mongoURL = "mongodb+srv://hellonish:nish2004@cluster0.su8rjb3.mongodb.net/"

const mongoURL = process.env.MONGODB_URL;

// set up mongodb connections
mongoose.connect(mongoURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

// get the default connections
// mongosh maintains a default connections object representing the mongodb connections

const db = mongoose.connection;

// Define event listerners for database connections

db.on('connected',() => {
    console.log('Connected to MongoDB Server');
});

db.on('error',() => {
    console.log('MongoDB Connected error');
});

db.on('disconnected',() => {
    console.log('MongoDB disconnected');
});

// Export the database connection

module.exports = db;