const express = require("express");

const { getBookmark } = require("../queries/bookmarks.js");
const users = express.Router({ mergeParams: true });
const {
  getAllUsers,
  getUser,
  newUser,
  deleteUser,
  updateUser,
  getAllBookmarksForUser,
  addNewBookmarkToUser,
  deleteBookmarkFromUser,
  getUserReviews,
} = require("../queries/users");

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

// UPDATE
users.put("/:id", async (req, res) => {
  const { id } = req.params;
  const updatedUser = await updateUser(req.body);
  if (updatedBookmark.id) {
    res.status(200).json(updatedUser);
  } else {
    res.status(404).json("User not found");
  }
});

// NEW
users.post("/", async (req, res) => {
  const user = await newUser(req.body);
  res.json(user);
});

// DELETE
users.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const deletedUser = await deleteUser(id);
  if (deletedUser.id) {
    res.status(200).json(deletedUser);
  } else {
    res.status(404).json("User not found");
  }
});

// See a list of user's reviews
users.get("/:userId/reviews", async (req, res) => {
  const { userId } = req.params;
  const userReviews = await getUserReviews(userId);
  res.json(userReviews);
});

// See a list of user's bookmarks
users.get("/:userId/bookmarks", async (req, res) => {
  const { userId } = req.params;
  const userBookmarks = await getAllBookmarksForUser(userId);
  res.json(userBookmarks);
});

// Add to a user's bookmark collection
users.post("/:userId/bookmarks/:bookmarkId", async (req, res) => {
  const { userId, bookmarkId } = req.params;
  const successfulAdd = await addNewBookmarkToUser(userId, bookmarkId);
  if (successfulAdd) {
    res.status(201).json({ message: "ok" });
  } else {
    res.status(400).json({ info: successfulAdd });
  }
});

// Remove from a user's bookmark collection
users.delete("/:userId/bookmarks/:bookmarkId", async (req, res) => {
  const { userId, bookmarkId } = req.params;
  const successfulDelete = await deleteBookmarkFromUser(userId, bookmarkId);
  if (successfulDelete) {
    res.status(202).json({ message: "ok" });
  } else {
    res.status(400).json({ info: successfulDelete });
  }
});

// TEST JSON NEW
// {
//     "userer":"Lou",
//      "title": "Fryin Better",
//      "content": "With the great tips and tricks I found here",
//      "bookmark_id": "2",
//      "rating": "4"
// }
module.exports = users;
