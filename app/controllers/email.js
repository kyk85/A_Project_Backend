var nodemailer = require('nodemailer');
// var Inquiry = require('../models/inquiry')

exports.inquiryReply = function(req, res) {
    var inquiry = {
        contactName: contactName,
        contactEmail: contactEmail,
        contactInquiry: contactInquiry
    }
    var transporter = nodemailer.createTransport({
        host: process.env.EHOST,
        port: process.env.EPORT,
        secure: false,
        auth: {
            user: process.env.EUSER,
            pass: process.env.EPASS
        }
    });
    
    let mailOptions = {
        from: '"YK" <kay2kay1@gmail.com>',
        to: this.inquiry.contactEmail,
        subject: 'Thank you for your inquiry ' + this.inquiry.contactName + ' !',
        text: 'Hello',
        html: 'Your inquiry:<br>' + this.inquiry.contactInquiry
    };

    // res.json({message:"asd"})

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.json(error);
        } else {
        // console.log(response)
        res.json({message: "sending email to " + name + " at " + email})
        }
    });
}
