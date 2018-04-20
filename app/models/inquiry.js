var mongoose = require('mongoose');

var InquirySchema = new mongoose.Schema({
    contactName: String,
    contactEmail: String,
    contactInquiry: String
})

module.exports = mongoose.model('Inquiry', InquirySchema)