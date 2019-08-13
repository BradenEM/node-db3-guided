const express = require("express");

const db = require("../data/db-config.js");
const Users = require("./user-model");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    // const users = await db("users");
    const user = await Users.find();
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Failed to get users" });
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const [user] = await Users.findById(id);

    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: "Could not find user with given id." });
    }
  } catch (err) {
    res.status(500).json({ message: "Failed to get user" });
  }
});

router.post("/", async (req, res) => {
  const userData = req.body;

  try {
    const [id] = await Users.addUser(userData);
    res.status(201).json({ created: id });
  } catch (err) {
    res.status(500).json({ message: "Failed to create new user" });
  }
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  try {
    const count = await Users.update(id, changes);

    if (count) {
      res.json({ update: count });
    } else {
      res.status(404).json({ message: "Could not find user with given id" });
    }
  } catch (err) {
    res.status(500).json({ message: "Failed to update user" });
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const count = await Users.removeUser(id);

    if (count) {
      res.json({ removed: count });
    } else {
      res.status(404).json({ message: "Could not find user with given id" });
    }
  } catch (err) {
    res.status(500).json({ message: "Failed to delete user" });
  }
});

router.get("/:id/posts", async (req, res) => {
  const { id } = req.params;

  try {
    const posts = await Users.findPosts(id);

    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
