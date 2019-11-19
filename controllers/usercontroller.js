var User = require("../models/User")
var bcrypt = require("bcrypt")

module.exports = {
    getLogin: (req, res) => {
        res.render("login")
    },
    postLogin: async (req, res) => {
        var user = await User.findOne({ username: req.body.username })
        if (user != null) {
            //check password
            try {
                await bcrypt.compare(req.body.password, user.password)
                req.session.uid = user.id
                res.redirect("/dashboard")
            } catch (e) {
                req.flash("error", "Wrong credentials.")
                res.redirect("login")
            }
        } else {
            req.flash("error", "Wrong credentials.")
            res.redirect("login")
        }
    },
    getRegister: (req, res) => {
        res.render("register")
    },
    postRegister: async (req, res) => {
        var username = req.body.username
        var password = req.body.password
        var password2 = req.body.password2
        if (username != null && username != "" && password != null && password != "" && password2 != null && password2 != "") {
            if (password == password2) {
                //check if username is taken
                var taken = await User.findOne({ username: req.body.username })
                if (taken == null) {
                    var pwHash = await bcrypt.hash(password, 10)
                    var user = new User({
                        username: username,
                        //TODO hash password
                        password: pwHash
                    })
                    user = await user.save()
                    //set session
                    req.session.uid = user.id
                    res.redirect("/dashboard")
                } else {
                    req.flash("error", "username is already taken")
                    res.redirect("/register")

                }
            } else {
                req.flash("error", "Passwords don't match")
                res.redirect("/dashboard")

            }
        } else {
            req.flash("error", "All fields have to be fille")
            res.redirect("/dashboard")

        }
    },
    getLogout: (req, res) => {
        req.session.uid = null
        res.redirect("/login")
    }
}