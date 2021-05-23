const GoogleStrategy = require('passport-google-oauth20').Strategy;
const config = require('./Config')
const User = require('../models/User')
const passport = require('passport')

passport.serializeUser((user, done) => {
    // sets cookies
    done(null, user.id)
})

passport.deserializeUser((id, done) => {
    User.findById(id).then((user) => {
        // sets req.user to user
        done(null, user)
    })
})

passport.use(new GoogleStrategy({
    // options for the google strategy
    clientID: config.google.clientID,
    clientSecret: config.google.clientSecret,
    callbackURL: 'http://localhost:3000/auth/google/redirect'
}, async (accessToken, refreshToken, profile, done) => {
    // passport function callback
    // runs as middleware from the callback
    console.log('passport middleware fired callback function');

    try {
        const user = await User.findOne({googleId: profile.id}).exec()

        if (user) {
            // sets req.user to user
            return done(null, user)
        } else {
            const newUser = await User.create({
                username: profile.displayName,
                googleId: profile.id
            })  
            // sets req.user to user
            return done(null, newUser)
        }
    } catch(err) {
        return done(err, false, {error: err.message})
    }
}))
