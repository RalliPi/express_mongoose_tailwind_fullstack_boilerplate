var User = require("./../models/User")

module.exports = async (req, res, next) => {
    if (req.session.uid != null) {
        //load user
        var user = await User.findById(req.session.uid);
        if (user != null) {
            req.user = user
            next()
        } else {
            req.flash("error", "No valid logged in user found. Please log in to access this site.")
            res.redirect("/login")
        }
    } else {
        req.flash("error", "You need to be logged in to access this site.")
        res.redirect("/login")
    }
}