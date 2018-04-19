var Book = require('../models/book');

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
    Book.find({'owner': user}, function(err, books){
        if (err){
            res.send(err);
        }
        res.json(books)
    });
}

exports.createBook = function(req, res, next){
    Book.create({
        title: req.body.title,
        author: req.body.author,
        isbn: req.body.isbn,
        coverArt: req.body.coverArt,
        owner: req.body.owner
    }, function(err, book){
        if(err){
            res.send(err)
        }

        Book.find(function(err, books){ // Lists books including newly created
            if(err){
                res.send(err);
            }
            res.json(books)
        });
    });
}

exports.deleteBook = function(req, res, next){
    Book.remove({
        _id: req.params.book_id
    }, function(err, book){
        res.json(book)
    });
}