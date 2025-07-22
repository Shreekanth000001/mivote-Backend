const mongoose = require('mongoose');

const mongoURI = process.env.MONGO_URI || "mongodb://localhost:27017/Mivotedb";

const connecToMongo = async () => {
    try {
        await mongoose.connect(mongoURI);
        console.log('Successfully connected to MongoDB');
    } catch (err) {
        console.error('Failed to connect to MongoDB', err);
        // Exit process with failure code if we can't connect to the DB
        process.exit(1);
    }
}

module.exports = connecToMongo;