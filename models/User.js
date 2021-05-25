const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    googleId: {
        type: String,
        required: true
    },
    thumbnail: {type: String}
}, {timestamps: {createdAt: true}});

const User = model('User', userSchema);

module.exports = User;