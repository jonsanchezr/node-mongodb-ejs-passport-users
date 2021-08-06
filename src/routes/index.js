const express = require('express');
const router = express.Router();
const passport = require('passport');

router.get('/', (req, res) => {
    return res.render('index');
});

router.get('/signup', (req, res) => {
    return res.render('signup');
});

router.post('/signup', passport.authenticate('local-signup', {
    successRedirect: '/profile',
    failureRedirect: '/signup',
    passReqToCallback: true
}));

router.get('/signin', (req, res) => {
    return res.render('signin');
});

router.post('/signin', passport.authenticate('local-signin', {
    successRedirect: '/profile',
    failureRedirect: '/signin',
    passReqToCallback: true
}));

router.get('/logout', (req, res) => {
    req.logOut();
    return res.redirect('/');
});

router.use((req, res, next) => {
    isAuthenticated(req, res, next);
    next();
})

router.get('/profile', isAuthenticated, (req, res) => {
    return res.render('profile');
});
router.get('/dashboard', isAuthenticated, (req, res) => {
    return res.send('dashboard');
});

function isAuthenticated(req ,res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/');
}

module.exports = router;
