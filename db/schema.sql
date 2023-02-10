
DROP DATABASE IF EXISTS bookmarks_user_api;
CREATE DATABASE bookmarks_user_api; 

\c bookmarks_user_api

DROP TABLE IF EXISTS bookmarks CASCADE;

DROP TABLE IF EXISTS users_bookmarks;
DROP TABLE IF EXISTS reviews;

DROP TABLE IF EXISTS users;

CREATE TABLE bookmarks (
    id SERIAL PRIMARY KEY, 
    name TEXT NOT NULL, 
    url TEXT,
    category TEXT,
    is_favorite BOOLEAN
);


CREATE TABLE users (
    id SERIAL PRIMARY KEY, 
    username TEXT UNIQUE NOT NULL, 
    password TEXT NOT NULL
);

CREATE TABLE users_bookmarks (
    created TIMESTAMP WITH TIME ZONE,
    bookmark_id INTEGER,
    user_id INTEGER
);

CREATE TABLE reviews (
    id SERIAL PRIMARY KEY, 
    reviewer TEXT, 
    title TEXT,
    content TEXT,
    rating NUMERIC,
    CHECK (rating >= 0 AND rating <= 5),
    bookmark_id INTEGER references bookmarks (id),
    user_id INTEGER references users (id)
    ON DELETE CASCADE
);