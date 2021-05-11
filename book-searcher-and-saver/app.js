var express = require('express');
const mongoose = require('mongoose');
require("dotenv").config();
var path = require('path');
var cookieParser = require('cookie-parser');

const PORT = process.env.PORT || 3001;
const app = express();

// Defining the middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Defining the routes for the pages to use with controller
const routes = require("./controllers");
const sequelize = require("./config/connection");

// Serve up static assets (usually on Heroku) 
if (process.env.NODE.ENV === "production") {
    app.use(express.static("client/build"));
}

// Defining API routes here 
app.use(routes)

// Connect to the MongoDB
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/booksearcherandsaver", { useNewUrlParser: true });

app.listen(PORT, () => {
    console.log(`🌎 ==> API server now on port ${PORT}!`);
});


