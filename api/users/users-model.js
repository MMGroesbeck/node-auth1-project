const db = require("../../database/dbConfig.js");

module.exports = {
    findAll,
    newUser,
    findById,
    findBy
}

function findAll() {
    return db("users")
        .select("id", "username");
}

async function newUser(user) {
    const [id] = await db("users").insert(user, "id");

    return findById(id);
}

function findBy(filter) {
    return db("users").where(filter);
}

function findById(id) {
    return db("users")
        .where({ id })
        .first();
}