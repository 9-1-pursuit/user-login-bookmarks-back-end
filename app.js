// DEPENDENCIES
const cors = require('cors');
const express = require('express');
const morgan = require('morgan');

// CONFIGURATION
const app = express();

// MIDDLEWARE
app.use(morgan('tiny'));
app.use(cors());
app.use(express.json()); // Parse incoming JSON

// ROUTES
app.get('/', (req, res) => {
  res.send('Hello, world!');
});

/////////////////////////////////////
// REMOVE AFTER SUCCESSFUL DEPLOYMENT
/////////////////////////////////////
const db = require('./db/dbConfig.js');

app.get('/test', async (req, res) => {
  try {
    const allDays = await db.any('SELECT * FROM test');
    res.json(allDays);
  } catch (err) {
    res.json(err);
  }
});

/////////////////////////////////////
// REMOVE AFTER SUCCESSFUL DEPLOYMENT
/////////////////////////////////////

const bookmarksController = require('./controllers/bookmarksController.js');
app.use('/bookmarks', bookmarksController);

const usersController = require('./controllers/usersController.js');
app.use('/users', usersController);
// EXPORT
module.exports = app;
