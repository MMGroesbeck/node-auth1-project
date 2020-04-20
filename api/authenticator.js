module.exports = (req, res, next) => {
    if(req.baseUrl.includes("/api/users")){
        if (req.session.loggedIn) {
            next();
        } else {
            res.status(401).json({ message: "You shall not pass!" });
        }
    } else {
        next();
    }
    
};