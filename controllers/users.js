const User = require("../models/user");

module.exports.renderSignupForm =  (req, res) => {
    res.render("users/signup");
};

module.exports.signup = async(req, res, next) => {
        try {
            let { username, email, password} = req.body;
            const newUser = new User ({ email, username});
            const registerdUser = await User.register(newUser, password);
            console.log(registerdUser);
            req.login(registerdUser, (err) => {
                if (err) {
                    return next(err);
                }
                req.flash("success", "welcome to wanderlust!");
                res.redirect("/listings");
            });

        } catch (e) {
            req.flash("error", e.message);
            res.redirect("/users/signup");
        }

            
        };

        module.exports.renderLoginForm = (req, res) => {
    res.render("users/login");
};

module.exports.login = async (req, res) => {
        req.flash("success", "Welcome back to wanderlust!");
        res.redirect(res.locals.redirectUrl || "/listings");

    };

    module.exports.logout = (req, res,next) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        req.flash("success", "you ara logged out!");
        res.redirect("/listings");
    });
};