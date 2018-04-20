var AuthController = require ('./controllers/authentication');
var BookController = require ('./controllers/book');
var EmailController = require ('./controllers/email');
var UserController = require ('./controllers/user');
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
    var userRoutes = express.Router();
    var bookRoutes = express.Router();
    var inquiryRoutes = express.Router();

// Base routes
apiRoutes.use('/main', baseRoute)
// /api/main
baseRoute.get('/', function(req, res){
    res.json({message:'it works!'});
});

// Authentication Routes
apiRoutes.use('/auth', authRoutes);
// /api/auth/...
authRoutes.post('/register', AuthController.register);
authRoutes.post('/login', requireLogin, AuthController.login);

authRoutes.get('/protected', requireAuth, function(req, res){
    // if (err) {
    //     res.send({content: 'Not yet authorized'});
    // }
    res.send({content: 'Success'});
});
// User Profile Routes
apiRoutes.use('/user', userRoutes);
// /api/user/
userRoutes.get('/:user_id', requireAuth, UserController.getUser)
userRoutes.post('/:user_id', requireAuth, UserController.editUser)


// Book Routes
apiRoutes.use('/book', bookRoutes);
// /api/book/...
bookRoutes.get('/:user_id', requireAuth, AuthController.roleAuthorization(['user','admin']), BookController.getBooks);
bookRoutes.post('/:user_id', requireAuth, AuthController.roleAuthorization(['user','admin']), BookController.createBook);
bookRoutes.post('/:user_id/:book_id', requireAuth, AuthController.roleAuthorization(['user','admin']), BookController.editBook);
bookRoutes.delete('/:user_id/:book_id', requireAuth, AuthController.roleAuthorization(['user','admin']), BookController.deleteBook);

// Inquiry Routes
apiRoutes.use('/inquiry', inquiryRoutes)

inquiryRoutes.post('/', EmailController.inquiryReply)

// Prefix
app.use('/api', apiRoutes) 

}


