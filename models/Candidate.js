const mongoose = require('mongoose');
const { Schema } = mongoose;

const candidateSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String
    },
    img: {
        type: String
    },
    categorytype: {
        type: String,
        enum: ['President', 'Secretary', 'VicePresident'],
        required: true
    },
    doi: { type: Date, default: Date.now },
});

const Candidate = mongoose.model('Candidate', candidateSchema);
Candidate.createIndexes();
module.exports = Candidate;