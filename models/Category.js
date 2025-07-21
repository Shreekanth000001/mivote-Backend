const mongoose = require('mongoose');
const { Schema } = mongoose;

const categorySchema = new Schema({
    categorytype: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    url: {
        type: String
    },
    doi: { type: Date, default: Date.now },
});

const Category = mongoose.model('Category', categorySchema);
Category.createIndexes();
module.exports = Category;