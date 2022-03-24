const express = require("express");
const Post = require("../models/post.models");
const crudController = require("./crud.controllers");
const app = express();

//POSTS CRUD
app.get("", async (req, res) => {
    try {
        const posts = await Post.find()
            .populate({
                path: "userId",
                select: { firstName: 1, email: 1, _id: 0 }
            }).lean().exec();
        return res.status(200).send(posts);
    }
    catch (err) {
        return res.status(500).send({ message: err.message });
    }
});
app.post("", crudController(Post).post);
//app.post("", async (req, res) => {
//    try {
//        const post = await Post.create(req.body);
//        return res.status(200).send(post);
//    }
//    catch (err) {
//        return res.status(500).send({ message: err.message });
//    }
//});
app.get("/:id", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)
            .populate({
                path: 'userId',
                select: { firstName: 1, email: 1, _id: 0 }
            })
            .lean().exec();
        return res.status(200).send(post)
    }
    catch (err) {
        return res.status(500).send({ message: err.message });
    }
});
app.patch("/:id", async (req, res) => {
    try {
        const post = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true })
            .populate({
                path: "userId",
                select: { firstName: 1, email: 1, _id: 0 }
            })
            .lean().exec();
        return res.status(200).send(post);
    }
    catch (err) {
        res.status(500).send({ message: err.message });
    }
});
app.delete("/:id", crudController(Post).deleteOne);
//app.delete("/:id", async (req, res) => {
//    try {
//        const post = await Post.findByIdAndDelete(req.params.id);
//        return res.status(200).send(post);
//    }
//    catch (err) {
//        return res.status(500).send({ message: err.message });
//    }
//});

app.get("/:postId/comments", async (req, res) => {
    try {
        const comments = await Comment.find({ postId: req.params.postId }).lean().exec();
        return res.send(comments);
    }
    catch (err) {
        return res.status(500).send({ message: err.message })
    }
});

module.exports = app;