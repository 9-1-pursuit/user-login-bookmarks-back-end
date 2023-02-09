const express = require("express");

const users = express.Router({ mergeParams: true });
const { getAllUsers, getUser, newUser, login } = require("../queries/users");

users.get("/", async (req, res) => {
  const allUsers = await getAllUsers();
  if (allUsers[0]) {
    res.status(200).json(allUsers);
  } else {
    res.status(500).json({ error: "server error" });
  }
});

// SHOW
users.get("/:id", async (req, res) => {
  const { id } = req.params;
  const user = await getUser(id);
  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ error: "User not found" });
  }
});

//SIGNUP
users.post("/signup", async (req, res) => {});

//LOGIN
users.post("/login", async (req, res) => {});

// See a list of user's bookmarks
users.get("/:userId/bookmarks", async (req, res) => {});

// Add to a user's bookmark collection
users.post("/:userId/bookmarks/:bookmarkId", async (req, res) => {});

module.exports = users;
