const router = require("express").Router();
const bcrypt = require("bcryptjs");

const Users = require("../users/users-model.js");

router.post("/", (req, res) => {
    let newUser = req.body;
    const saltLength = process.env.HASH_ROUNDS ||14;
    const hash = bcrypt.hashSync(newUser.password, saltLength);
    newUser.password = hash;
    Users.newUser(newUser)
        .then(user => {
            req.session.loggedIn = true;
            req.session.loggedInAs = user.username;
            res.status(201).json(user);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ errorMessage: err.message });
        });
});

module.exports = router;