const db = require('../db/dbConfig.js');

const getAllUsers = async () => {
  try {
    const allUsers = await db.any('SELECT * FROM users');

    return allUsers;
  } catch (err) {
    return err;
  }
};

const getUser = async (id) => {
  try {
    const oneUser = await db.one('SELECT * FROM users WHERE id=$1', id);
    return oneUser;
  } catch (err) {
    return err;
  }
};

const newUser = async () => {};

const loginUser = async () => {};

getAllBookmarksForUser = async () => {};

addNewBookmarkToUser = async () => {};

module.exports = {
  getAllUsers,
  getUser,
  newUser,
  loginUser,
  getAllBookmarksForUser,
  addNewBookmarkToUser
};
