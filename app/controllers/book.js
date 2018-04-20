var Book = require('../models/book');
var User = require('../models/user');

// exports.getBooks = function(req, res, next){
//     Book.find(function(err, books){
//         if (err){
//             res.send(err);
//         }
//         res.json(books)
//     });
// }

exports.getBooks = function(req, res, next){
    var user = req.params.user_id
    User.findById(user, 'library', function(err, data){
        if (err){
            res.send(err);
        }
        res.json(data)
    });
}

// exports.createBook = function(req, res, next){
//     Book.create({
//         title: req.body.title,
//         author: req.body.author,
//         isbn: req.body.isbn,
//         coverArt: req.body.coverArt,
//         owner: req.body.owner
//     }, function(err, book){
//         if(err){
//             res.send(err)
//         }

//         Book.find(function(err, books){ // Lists books including newly created
//             if(err){
//                 res.send(err);
//             }
//             res.json(books)
//         });
//     });
// }

exports.createBook = function(req, res, next){

    console.log(req.params.user_id)
    var book = {
        title:req.body.title,
        author:req.body.author,
        isbn: req.body.isbn,
        coverArt: req.body.coverArt
    }
    User.findByIdAndUpdate(req.params.user_id, {$push: {library: book}}).then(()=>{
        User.markModified('library');
        User.save();
    });

    User.findById(req.params.user_id, 'library', function(err, data){
        if(err){
            res.send(err);
        }
        res.json(data);
    })
}

exports.editBook = function(req, res, next){
    // var user = req.params.user_id
    // var book = req.params.book_id
    // var test = User.findById(req.params.user_id)
    // console.log(test)
    User.findOneAndUpdate(
        // {$unwind:'$library'},
        // {$match: {'library.id': 'ObjectId(' + req.params.book_id + ')'}},
        // {$group: {_id:"$_id", library: {$push:'$library'}}},
        // {'_id' : req.params.user_id},
        // {'library':{$elemMatch:{ '_id' : req.params.book_id}}},
        {'_id':req.params.user_id,'library._id': req.params.book_id},
        {'library.$.title': req.body.title,
        'library.$.author': req.body.author,
        'library.$.isbn': req.body.isbn,
        'library.$.coverArt': req.body.coverArt})
        .then(()=>{
            User.markModified('library');
            User.save();
        })

        User.findById(req.params.user_id, 'library', function(err, data){
            if(err){
                res.send(err);
            }
            res.json(data);
        })
}

exports.deleteBook = function(req, res, next){
    // var user = req.params.user_id
    // var book = req.params.book_id
    // var test = User.findById(req.params.user_id)
    // console.log(test)
    User.findByIdAndUpdate(req.params.user_id, {$pull: {library: {_id:req.params.book_id}}}).then((data)=>{
        // res.json(data)
        User.markModified('library');
        User.save();
    });

    User.findById(req.params.user_id, 'library', function(err, data){
        if(err){
            res.send(err);
        }
        res.json(data);
    })
}
