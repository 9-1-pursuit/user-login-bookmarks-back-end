const { any } = require("../db/dbConfig.js");
const db = require("../db/dbConfig.js");

const getAllUsers = async () => {
  try {
    const allUsers = await db.any("SELECT * FROM users");

    return allUsers;
  } catch (err) {
    return err;
  }
};

const getUser = async (id) => {
  try {
    const oneUser = await db.one("SELECT * FROM users WHERE id=$1", id);
    return oneUser;
  } catch (err) {
    return err;
  }
};

const newUser = async (user) => {
  try {
    const newUser = await db.one(
      "INSERT INTO users (username, verified, password, admin) VALUES($1, $2, $3, $4) RETURNING *",
      [user.username, user.verified, user.password, user.admin]
    );
    return newUser;
  } catch (err) {
    return err;
  }
};

const deleteUser = async (id) => {
  try {
    const deletedUser = await db.one(
      "DELETE FROM users WHERE id = $1 RETURNING *",
      id
    );
    return deletedUser;
  } catch (err) {
    return err;
  }
};

const updateUser = async (user) => {
  try {
    const updatedUser = await db.one(
      "UPDATE users SET username=$1, verified=$2, password=$3, admin=$4 where id=$5 RETURNING *",
      [user.username, user.verified, user.password, user.admin, user.id]
    );
    return updatedUser;
  } catch (err) {
    return err;
  }
};

getAllBookmarksForUser = async (id) => {
  try {
    const bookmarksByUser = await db.any(
      `
        SELECT
          bookmark_id, user_id, name, is_favorite, category
        FROM
            users_bookmarks
        JOIN
            users
        ON
            users.id = users_bookmarks.user_id
        JOIN
            bookmarks
        ON
            bookmarks.id = users_bookmarks.bookmark_id
        WHERE
            users_bookmarks.user_id = $1;
      `,
      id
    );
    return bookmarksByUser;
  } catch (err) {
    return err;
  }
};

addNewBookmarkToUser = async (userId, bookmarkId) => {
  try {
    let add = await db.none(
      `
     INSERT INTO users_bookmarks (user_id, bookmark_id)
     VALUES ($1, $2)
    `,
      [userId, bookmarkId]
    );
    // return a value of true since it was successful, db.none always returns null
    return !add;
  } catch (err) {
    return err;
  }
};

deleteBookmarkFromUser = async (userId, bookmarkId) => {
  try {
    let remove = await db.none(
      `
      "DELETE FROM users WHERE user_id = $1 AND bookmark_id=$2",
    `,
      [userId, bookmarkId]
    );
    return !remove;
  } catch (err) {
    return err;
  }
};

getUserReviews = async (id) => {
  try {
    const user = await db.one("SELECT * FROM users WHERE id=$1", id);
    const reviews = await db.any(
      "SELECT * FROM reviews WHERE reviewer=$1",
      user.username
    );
    const bookmark = await any(
      `
    SELECT
      name, category, bookmarks.id
    FROM
      reviews
    JOIN
      bookmarks
    ON
      bookmarks.id = reviews.bookmark_id
    JOIN
      users
    ON
      reviews.reviewer = users.username
    WHERE
      users.id = $1
    `,
      id
    );

    const data = {
      user,
      bookmark,
      reviews,
    };
    return data;
  } catch (err) {
    return err;
  }
};

// addBookmarkForUser = async();
module.exports = {
  getAllUsers,
  getUser,
  newUser,
  deleteUser,
  updateUser,
  getAllBookmarksForUser,
  addNewBookmarkToUser,
  deleteBookmarkFromUser,
  getUserReviews,
};
