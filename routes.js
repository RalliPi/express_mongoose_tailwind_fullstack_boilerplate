var isAuthenticated = require("./middlewares/isAuthenticated")
var userController = require("./controllers/usercontroller")
module.exports =
    (app) => {
        app.get('/', function (req, res) {
            res.render('index')
        })

        app.get("/dashboard", isAuthenticated, (req, res) => {
            res.render("dashboard")
        })

        app.get("/login", userController.getLogin)
        app.post("/login", userController.postLogin)

        app.get("/register", userController.getRegister)
        app.post("/register", userController.postRegister)

        app.get("/logout", userController.getLogout)

    }
