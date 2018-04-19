var mongoose = require('mongoose');

var BookSchema = new mongoose.Schema({
    coverArt: { 
        type: String,
        required:true
    },
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    publisher: String,
    publishDate: String,
    edition: String,
    isbn:{
        type: Number,
        required: true
    },
    isRead:{
        type: Boolean,
        default: false
    },
    isOwned:{
        type: Boolean,
        default: false
    },
    review: String,
    owner: {
        type: String
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Book', BookSchema)