// Dependencies
const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

const session = require('express-session');
const flash = require('connect-flash');
const { ValidationError } = require('express-validation')
const { getStocks, addStock, getOneStock } = require('./src/controllers/stock.controller')
const { validate } = require('express-validation')
const { addNewStock, getOneStockValidation } = require('./src/validations/stock.validation')
const mysql = require('mysql2/promise');


// Create a MySQL connection
const connection  = mysql.createPool({
    host:'localhost',
    user:'root',
    database:'student-information',
    port:'3306',
    password:'Lucky@3352' 
});


// Set up an Express app
const app = express();

// Use body-parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Set up session middleware
app.use(session({
 secret: 'secret',
 resave: false,
 saveUninitialized: false
}));

// Set up flash middleware
app.use(flash());

app.get('/api',(req,res)=>{
    res.send("hello world")
})
app.get('',(req,res)=>{
    res.send('home')
})
app.get('/api/stocks', (request, response) => getStocks(request, response))
app.post('/api/stocks', validate(addNewStock), (request, response) => addStock(request, response))
app.get('/api/stocks/:id',(request,response)=>getOneStock(request, response))

// app.use('/api/stocks', stockRoutes)

app.use(function (error, request, response, next) {
    if (error instanceof ValidationError) {
        return response.status(error.statusCode).json({ status: false, message: error.details.body[0].message })
    }

})



// Set up passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Configure passport to use local strategy
passport.use(new LocalStrategy(
 (username, password, done) => {
    connection.query('SELECT password FROM student_details WHERE username = ?', [username], (err, result) => {
      if (err) throw err;

      if (result.length === 0) {
        return done(null, false, { message: 'Incorrect username.' });
      }

      bcrypt.compare(password, result[0].password, (err, isMatch) => {
        if (err) throw err;

        if (isMatch) {
          return done(null, username);
        } else {
          return done(null, false, { message: 'Incorrect password.' });
        }
      });
    });
 }
));

// Save user data to the session
passport.serializeUser((username, done) => {
 done(null, username);
});

// Load user data from the session
passport.deserializeUser((username, done) => {
 done(null, username);
});

// Protect a route and restrict access to logged-in users
function isLoggedIn(req, res, next) {
 if (req.isAuthenticated()) {
    return next();
 }
 res.redirect('/login');
}

// Login user
app.post('/login', passport.authenticate('local', {
 successRedirect: '/dashboard',
 failureRedirect: '/login',
 failureFlash: true
}));

// Protected dashboard
app.get('/dashboard', isLoggedIn, (req, res) => {
 res.send('Welcome to the dashboard. You can download notes or previous year papers here.');
});

// Download documents
app.get('/download/:filename', isLoggedIn, (req, res) => {
 const filename = req.params.filename;
 res.download(`public/documents/${filename}`, (err) => {
    if (err) throw err;
    console.log(`${filename} was downloaded successfully.`);
 });
});

// Start the server
app.listen(5500, () => {
 console.log('Server is running on port 5500.');
});