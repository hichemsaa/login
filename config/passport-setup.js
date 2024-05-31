const passport = require ('passport');
const router = require('express').Router();
const FacebookStrategy = require('passport-facebook').Strategy;
const keys = require('./keys');
const User = require ('../models/user-model');


passport.serializeUser(function(user, done) {
    done(null, user.id);
  });
  
  passport.deserializeUser(function(id, done) {
    User.findById(id)
    .then(function(user) {
        done(null, user);
      })
    .catch(function(err) {
        done(err);
      });
  });

// Update your Facebook login flow to save the user to your MongoDB database after they log in
passport.use(new FacebookStrategy({
  clientID: keys.facebook.FACEBOOK_APP_ID,
  clientSecret: keys.facebook.FACEBOOK_APP_SECRET,
  callbackURL: '/auth/facebook/callback'
},
function(accessToken, refreshToken, profile, done) {
    // Find or create the user in your MongoDB database
User.findOne({ facebookId: profile.id })
.then(function(user) {
   if (user) { return done(null, user); }

   const newUser = new User({
     facebookId: profile.id,
     name: profile.displayName,
     email: profile.emails && profile.emails[0] && profile.emails[0].value,
   });

   return newUser.save()
    .then(function() {
       return done(null, newUser);
     });
 })
.catch(function(err) {
   return done(err);
 });
  /*Find or create the user in your MongoDB database
  User.findOne({ facebookId: profile.id }, function(err, user) {
    if (err) { return done(err); }
    if (user) { return done(null, user); }

    const newUser = new User({
      facebookId: profile.id,
      name: profile.displayName,
      email: profile.emails[0].value
    });

    newUser.save(function(err) {
      if (err) { return done(err); }
      return done(null, newUser);
    });
  });*/
}));

  // Create a route in your Express app that initiates the Facebook login flow
router.get('/auth/facebook',
passport.authenticate('facebook', { scope: ['email'] }));

// Create a route in your Express app that handles the Facebook login callback
router.get('/auth/facebook/callback',
passport.authenticate('facebook', { failureRedirect: '/login' }),
function(req, res) {
  // Successful authentication, redirect home
  res.redirect('/');
});