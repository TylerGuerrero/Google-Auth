const router = require('express').Router();
const passport = require('passport')

router.get('/login', (req, res) => {
    res.render('login', {user: user.req});
})

router.get('/logout', (req, res) => {
    // handle with passport
    req.logOut()
    res.redirect('/')
})

// auth with google
router.get('/google', 
    passport.authenticate('google', {
        scope: ['profile']
}))

// callback route for google to redirect
router.get('/google/redirect', passport.authenticate('google'), (req, res) => {
    res.redirect('/profile/');
})

module.exports = router;