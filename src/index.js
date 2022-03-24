const express = require("express");
//const mongoose = require("mongoose"); //does not belong here
////
//const User = require("./models/user.models");
//const Post = require("./models/post.models");
//const Comment = require("./models/comment.models");

const userController = require("./controllers/user.controllers");
const postController = require("./controllers/post.controllers");
const commentController = require("./controllers/comment.controllers");

const connect = require("./configs/db.js");

const app = express();

app.use(express.json());

app.use("/users", userController);
app.use("/posts", postController);
app.use("/comments", commentController);

//User.find(); - db.users.find()
//User.create(); - db.users.insert()
//server run
app.listen(5000, async () => {
    try {
        await connect();
    }
    catch (err) {
        console.log(err);
    }
    console.log("listening on port 5000");
});