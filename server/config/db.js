require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../models/User');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true 
        })

        console.log('MongoDb connection SUCCESS')


    } catch (error) {
        console.log(error)
        console.error("MongoDB connection FAIL");
        process.exit(1);
    
    }
}

module.exports = connectDB;