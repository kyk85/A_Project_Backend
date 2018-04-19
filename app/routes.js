var AuthController = require ('./controllers/authentication');
var BookController = require ('./controllers/book');
var EmailController = require ('./controllers/email')
var express = require ('express');
var passportService = require ('../config/passport');
var passport = require ('passport');
//var nodemailer = require ('nodemailer');

var requireAuth = passport.authenticate('jwt', {session: false})
var requireLogin = passport.authenticate('local', {session: false})

module.exports = function(app){
    var apiRoutes = express.Router();
    var baseRoute = express.Router();
    var authRoutes = express.Router();
    var bookRoutes = express.Router();
    var inquiryRoutes = express.Router();

// Base routes
// /api/main
apiRoutes.use('/main', baseRoute)

baseRoute.get('/', function(req, res){
    res.json({message:'it works!'});
});

// Authentication Routes
// /api/auth/...
apiRoutes.use('/auth', authRoutes);

authRoutes.post('/register', AuthController.register);
authRoutes.post('/login', requireLogin, AuthController.login);

authRoutes.get('/protected', requireAuth, function(req, res){
    // if (err) {
    //     res.send({content: 'Not yet authorized'});
    // }
    res.send({content: 'Success'});
});

// Book Routes
// /api/book/...
apiRoutes.use('/book', bookRoutes);

bookRoutes.get('/:user_id', requireAuth, AuthController.roleAuthorization(['user','admin']), BookController.getBooks);
bookRoutes.post('/:user_id', requireAuth, AuthController.roleAuthorization(['user','admin']), BookController.createBook);
bookRoutes.delete('/:user_id/:book_id', requireAuth, AuthController.roleAuthorization(['user','admin']), BookController.deleteBook);

// Inquiry Routes
apiRoutes.use('/inquiry', inquiryRoutes)

inquiryRoutes.post('/', EmailController.inquiryReply)

// Prefix
app.use('/api', apiRoutes) 

}


