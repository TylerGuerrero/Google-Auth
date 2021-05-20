const router = require('express').Router();
const passport = require('passport')

router.get('/login', (req, res) => {
    res.render('login');
})

router.get('/logout', (req, res) => {
    // handle with passport
    res.send('Logging out')
})

// auth with google
router.get('/google', 
    passport.authenticate('google', {
        scope: ['profile']
}))

// callback route for google to redirect
router.get('/google/redirect', (req, res) => {
    res.send('hello')
})

module.exports = router;