const db = require("../../database/dbConfig.js");

module.exports = {
    findAll,
    newUser
}

function findAll() {
    return db("users")
        .select("id", "username");
}

async function newUser(user) {
    const [id] = await db("users").insert(user, "id");

    return findById(id);
}

function findById(id) {
    return db("users")
        .where({ id })
        .first();
}