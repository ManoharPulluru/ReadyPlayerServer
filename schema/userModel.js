const mongoose = require('mongoose');

const userSignupSchema = mongoose.Schema({
    username: String,
    email: String,
    password: String
})

module.exports = mongoose.model('userDetails', userSignupSchema)