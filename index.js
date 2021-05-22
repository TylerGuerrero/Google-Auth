const express = require('express');
const path = require('path');
const morgan = require('morgan');
const mongoose = require('mongoose');
const passport = require('passport')

const config = require('./config/Config')
const googleAuth = require('./routes/Router');
const cookieSession = require('cookie-session');


// init server
const app = express();

const options = {
    useNewUrlParser: true, 
    useUnifiedTopology: true, 
    useCreateIndex: true
}

mongoose.connect(config.database, options).catch((err) => {
    console.log(err);
});

mongoose.connection.on('error', () => {
    console.log('Database error')
})

mongoose.connection.once('open', () => {
    console.log('MongoDB is running')
})

// server settings
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'));

// middle ware
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));
app.use(morgan('dev'))
app.use(passport.initialize());
app.use(passport.session());
app.use(cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: [config.session.cookieKey]
}))



require('./config/Passport')

app.get('/', (req, res) => {
    res.render('home');
})

app.use('/auth', googleAuth);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`)
})