const router = require('express').Router();
const passport = require('passport');

router.get('/login', (req, res) => {
    res.render('login', { user: req.user });
});
// Create a route in your Express app that initiates the Facebook login flow
router.get('/facebook',
passport.authenticate('facebook', { scope: ['email'] }));
  
// Create a route in your Express app that handles the Facebook login callback
router.get('/facebook/callback',
    passport.authenticate('facebook', { failureRedirect: '/login' }),
    function(req, res) {
    // Successful authentication, redirect home
        res.redirect('/profile');
});
router.get('/logout', (req, res, next) => {
    req.logout((error)=>{
        if (error) {return next(error)}
        res.redirect('/')
    });  
});
module.exports = router;
