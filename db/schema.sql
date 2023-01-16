
DROP DATABASE IF EXISTS bookmarks_api;
CREATE DATABASE bookmarks_api; 

\c bookmarks_api 

DROP TABLE IF EXISTS bookmarks CASCADE;

CREATE TABLE bookmarks (
    id SERIAL PRIMARY KEY, 
    name TEXT NOT NULL, 
    url TEXT,
    category TEXT,
    is_favorite BOOLEAN
);

-- DROP TABLE IF EXISTS reviews;

-- review must have a valid bookmark id
-- remove reviews if bookmark is deleted
-- rating must be between 0 and 5
CREATE TABLE reviews (
    id SERIAL PRIMARY KEY, 
    reviewer TEXT, 
    title TEXT,
    content TEXT,
    rating NUMERIC,
    CHECK (rating >= 0 AND rating <= 5),
    bookmark_id INTEGER references bookmarks (id)
    ON DELETE CASCADE
);

-- DROP TABLE IF EXISTS users;

-- CREATE TABLE users (
--     id SERIAL PRIMARY KEY, 
--     username TEXT UNIQUE, 
--     admin BOOLEAN DEFAULT false,
--     verified BOOLEAN DEFAULT false
-- );

-- DROP TABLE IF EXISTS users_bookmarks;

-- CREATE TABLE users_bookmarks (
--     created TIMESTAMP WITH TIME ZONE,
--     bookmark_id INTEGER,
--     user_id INTEGER
-- );