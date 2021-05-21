const GoogleStrategy = require('passport-google-oauth20').Strategy;
const config = require('./Config')
const User = require('../models/User')

module.exports = function(passport) {
    passport.use(new GoogleStrategy({
        // options for the google strategy
        clientID: config.google.clientID,
        clientSecret: config.google.clientSecret,
        callbackURL: 'http://localhost:3000/auth/google/redirect'
    }, async (accessToken, refreshToken, profile, done) => {
        // passport function callback
        // runs as middleware from the callback
        console.log('passport callback function fire')
        console.log(profile)

        const user = new User({
            username: profile.displayName,
            googleId: profile.id
        })

        await user.save()
        .then((user) => {
            console.log('new user created' + user)
        })
        .catch((err) => {
            console.log(err);
        })
    }))
}