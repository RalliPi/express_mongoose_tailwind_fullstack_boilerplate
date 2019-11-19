require('dotenv-flow').config();
var mongoose = require('mongoose');
var server = require("./server")


mongoose.connect('mongodb://' + process.env.DATABASE_HOST + '/' + process.env.DATABASE_NAME, { useNewUrlParser: true });
mongoose.connection.on('error', console.error.bind(console, 'connection error:'));
mongoose.connection.once('open', async function () {
    console.log("connected to db")

    //start server
    server.listen(process.env.PORT, () => {
        console.log("app listening on port " + process.env.PORT)
    })
})