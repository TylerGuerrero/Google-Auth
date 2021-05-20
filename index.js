const express = require('express');
const path = require('path');
const morgan = require('morgan');
const passport = require('passport')
const mongoose = require('mongoose');

const config = require('./config/Config')
const googleAuth = require('./routes/Router');

// init server
const app = express();

// server settings
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'));

// middle ware
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));
app.use(morgan('dev'))

require('./config/Passport')(passport);

app.get('/', (req, res) => {
    res.render('home');
})

app.use('/auth', googleAuth);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`)
})