const GoogleStrategy = require('passport-google-oauth20').Strategy;
const config = require('./Config')

module.exports = function(passport) {
    passport.use(new GoogleStrategy({
        // options for the google strategy
        clientID: config.google.clientID,
        clientSecret: config.google.clientSecret,
        callbackURL: 'http://localhost:3000/auth/google/redirect'
    }, () => {
        // passport function callback
    }))
}