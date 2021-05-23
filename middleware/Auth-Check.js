const authCheck = (req, res, next) => {
    // checks if req.user exists
    if (!req.isAuthenticated()) {
        console.log('user is not authenticated')
        res.redirect("/auth/login");
    } else {
        console.log('you are logged in')
        next();
    }
}

module.exports = {
    authCheck
}