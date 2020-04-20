const router = require("express").Router();
const bcrypt = require("bcryptjs");

const Users = require("../users/users-model.js");

router.post("/", (req, res) => {
    let { username, password } = req.body;

    Users.findBy({ username })
        .then(([thisUser]) => {
            if (thisUser && bcrypt.compareSync(password, thisUser.password)) {
                req.session.loggedIn = true;
                res.status(200).json({ message: "Welcome!" });
            } else {
                res.status(401).json({ message: "Not authenticated." });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ errorMessage: err.message });
        })
})

module.exports = router;