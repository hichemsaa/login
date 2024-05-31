const express = require('express');
const passport = require('passport');
const authRoutes = require('./routes/auth-routes');
const profileRoutes = require('./routes/profile-routes');
const keys = require('./config/keys');
const passportSetup = require('./config/passport-setup');
const mongoose = require('mongoose');
const session = require('express-session');

const app = express();
app.set('view engine', 'ejs');

// Configure Express app
app.use(session({
  secret: 'your secret key',
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

mongoose.connect(keys.mongodb.dbURI,);
// set up routes
app.use('/auth', authRoutes);
app.use('/profile', profileRoutes);


app.get('/', (req, res) => {
    res.render('home', { user: req.user });
});





app.listen(3000, () => {
    console.log('app now listening for requests on port 3000');
});