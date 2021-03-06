var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

var ItemSchema = new mongoose.Schema({
    title: String,
    author: String
}, {
    timestamps: true
})

var UserSchema = new mongoose.Schema({
    email: {
        type: String,
        lowercase: true,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    displayName: {
        type: String
    },
    displayPic: {
        type: String,
        default: "https://eliaslealblog.files.wordpress.com/2014/03/user-200.png"
    },
    library: [{
        title: String,
        author: String,
        isbn: Number,
        coverArt: String,
        isRead: {type: Boolean, default: false}
    }],
    isDisabled: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

UserSchema.pre('save', function(next){
    var user = this;
    var SALT_FACTOR = 5;

    if(!user.isModified('password')){
        return(next)
    }

    bcrypt.genSalt(SALT_FACTOR, function(err, salt){
        if(err){
            return next(err);
        } 

        bcrypt.hash(user.password, salt, null, function(err, hash){
            if(err){
                return next(err);
            }

            user.password = hash;
            next()
        })
    });
});

UserSchema.methods.comparePassword = function(passwordAttempt, cb){
    bcrypt.compare(passwordAttempt, this.password, function(err, isMatch){
        if(err){
            return cb(err);
        } else {
            cb(null, isMatch);
        }
    })
}

module.exports = mongoose.model('User', UserSchema);