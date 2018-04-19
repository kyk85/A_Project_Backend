var Book = require('../models/book');

exports.getBooks = function(req, res, next){
    Book.find(function(err, books){
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
        isbn: req.body.isbn
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
    console.log(req.params.book._id)
    Book.remove({
        _id: req.params.book._id
    }, function(err, todo){
        res.json(book)
    });
}