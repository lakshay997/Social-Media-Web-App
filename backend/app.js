const path = require("path");
const express = require('express');
const bodyParser = require('body-parser'); 
const mongoose = require('mongoose');
const postsRoutes = require("./routes/posts");
const userRoutes = require("./routes/user");
const cors = require('cors');



const app = express();

mongoose.connect("mongodb+srv://lakshay:"+ process.env.MONGO_ATLAS_PW +"@cluster0-jlzll.mongodb.net/mean?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => {
    console.log("Connected to database");
})
.catch(() => {
    console.log("Connection failed");
});

app.options('*', cors()) // include before other routes 
app.use(cors())

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use("/images", express.static(path.join("backend/images")));

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Allow-Control-Allow-Method", "GET, POST, PATCH, PUT, DELETE, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
});


app.use("/api/posts", postsRoutes);
app.use("/api/user", userRoutes);
module.exports = app;





//jl0ubTYGMnqD08hU