const router = require('express').Router();

router.get('/login', (req, res) => {
    res.render('login');
})

router.get('/logout', (req, res) => {
    // handle with passport
    res.send('Logging out')
})

// auth with google
router.get('/google', (req, res) => {
    // handle with passport
})

module.exports = router;