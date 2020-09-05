const express = require('express');
const app = new express();
const ejs = require('ejs');
global.loggedIn = null;

// MongoDB Configuration
const mongoose = require('mongoose');

// Body Parser
const bodyParser = require('body-parser');

// File Upload
const fileUpload = require('express-fileupload');

// Express Sessions
const expressSession = require('express-session');

// Custom Middleware declaration
const validateMiddleware = require('./middleware/validateMiddleware');
const authMiddleware = require('./middleware/authMiddleware');
const redirectIfAuthenticatedMiddleware = require('./middleware/redirectIfAuthenticatedMiddleware');

// Controllers
const homeController = require('./controllers/home')
const aboutController = require('./controllers/aboutCtrl')
const contactController = require('./controllers/contactCtrl')
const newPostController = require('./controllers/newPost')
const getPostController = require('./controllers/getPost')
const storePostController = require('./controllers/storePost')
const newUserController = require('./controllers/newUser')
const storeUserController = require('./controllers/storeUser')
const loginController = require('./controllers/login')
const loginUserController = require('./controllers/loginUser')
const logoutController = require('./controllers/logout');


// Middlewares applied to Express
app.use(express.static('public'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
// Custom Middlewares
app.use(fileUpload())
app.use('/posts/store', validateMiddleware)
app.use(expressSession({
    secret: 'keyboard cat'
}))
app.use("*", (req, res, next) => {
    loggedIn = req.session.userId;
    next()
});

app.set('view engine', 'ejs')
mongoose.connect('mongodb://localhost/my_database', {userNewUrlParser: true})

app.get('/', homeController)

app.get('/about', aboutController)

app.get('/contact', contactController)

app.get('/post/:id', getPostController)

app.get('/posts/new', authMiddleware, newPostController)

app.post('/posts/store', authMiddleware, storePostController)

app.get('/auth/register', redirectIfAuthenticatedMiddleware, newUserController)

app.post('/users/register', redirectIfAuthenticatedMiddleware, storeUserController)

app.get('/auth/login', redirectIfAuthenticatedMiddleware, loginController)

app.post('/users/login', redirectIfAuthenticatedMiddleware, loginUserController)

app.get('/auth/logout', logoutController)

app.use((req, res) => res.render('notfound'));

app.listen(4000, () =>{
    console.log("App listening on port 4000")
})