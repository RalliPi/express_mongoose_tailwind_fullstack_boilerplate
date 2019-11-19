var express = require('express')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const ejslocals = require("ejs-locals")
var flash = require("express-flash")
var MongoDBStore = require('connect-mongodb-session')(session);
var routes = require('./routes')



var store = new MongoDBStore({
    uri: 'mongodb://' + process.env.DATABASE_HOST + '/' + process.env.DATABASE_NAME,
    collection: 'sessions'
});
store.on('error', function (error) {
    console.log(error);
});

var app = express()
app.use(express.json())
app.use(express.urlencoded())
app.use(cookieParser())
app.use(session({
    secret: process.env.SECRET,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 2 // 2 days
    },
    store: store,
    resave: false,
    saveUninitialized: false
}))
app.use(flash())

app.engine('ejs', ejslocals);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/public'));

routes(app)

module.exports = app