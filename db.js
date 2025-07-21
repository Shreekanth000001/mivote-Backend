const mongoose = require('mongoose');

// require('.env').config();

const mongoURI = "mongodb+srv://shreekanth669:shreekanthadmin1@tempcluster.cxe2bev.mongodb.net/godb";

const connecToMongo = async () => {
     await mongoose.connect(mongoURI)
        .then(() => {
            console.log('success');
        }).catch((err) => {
            console.log('no success', err);
        });
}

module.exports = connecToMongo