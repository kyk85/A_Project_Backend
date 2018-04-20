var User = require('../models/user');

exports.getUser = function(req, res, next){
    User.findById(req.params.user_id, function(err, data){
        if (err){
            res.send(err);
        }
        res.json(data)
    });
}

exports.editUser = function(req, res, next){
    User.findByIdAndUpdate(
        req.params.user_id,
        {'displayName': req.body.displayName},
        // 'user.': req.body.author,
        // 'user.$.isbn': req.body.isbn,
        ).then((data)=>{
            console.log(data)
            User.markModified('user');
            User.save();
        })

        User.findById(req.params.user_id, function(err, data){
            if(err){
                res.send(err);
            }
            res.json(data);
        })
}