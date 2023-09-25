CREATE DATABASE userdata;

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) ,
    password  VARCHAR(250)
);