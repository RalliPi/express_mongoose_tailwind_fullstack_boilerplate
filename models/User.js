var mongoose = require('mongoose');

var User = mongoose.model('User', new mongoose.Schema(
    {
        username: String,
        password: String,
    },
    {
        timestamps: true
    }
));

module.exports = User;
