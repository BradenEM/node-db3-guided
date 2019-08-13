const db = require("../data/db-config.js");

module.exports = {
  find,
  findById,
  findPosts,
  addUser,
  update,
  removeUser
};

function find() {
  return db("users");
}

function findById(id) {
  return db("users").where({ id });
}

function findPosts(user_id) {
  return db("posts as p")
    .join("users as u", "u.id", "p.user_id")
    .select("p.id", "u.username", "p.contents")
    .where({ user_id });
}

function addUser(user) {
  return db("users").insert(user);
}

function update(id, changes) {
  return db("users")
    .where({ id })
    .update(changes);
}

function removeUser(id) {
  return db("users")
    .where({ id })
    .del();
}
