
DROP DATABASE IF EXISTS bookmarks_user_api;
CREATE DATABASE bookmarks_user_api; 

\c bookmarks_user_api

DROP TABLE IF EXISTS bookmarks CASCADE;

CREATE TABLE bookmarks (
    id SERIAL PRIMARY KEY, 
    name TEXT NOT NULL, 
    url TEXT,
    category TEXT,
    is_favorite BOOLEAN
);


DROP TABLE IF EXISTS users;

CREATE TABLE users (
    id SERIAL PRIMARY KEY, 
    username TEXT UNIQUE NOT NULL, 
    password TEXT NOT NULL
);

DROP TABLE IF EXISTS users_bookmarks;

CREATE TABLE users_bookmarks (
    created TIMESTAMP WITH TIME ZONE,
    bookmark_id INTEGER,
    user_id INTEGER
);