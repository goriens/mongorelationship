const express = require("express");
const Comment = require("../models/comment.models");

const crudController = require("./crud.controllers");
const app = express.Router();

//COMMENT CRUD
app.get("", async (req, res) => {
    try {
        const comments = await Comment.find()
            .populate({
                path: "postId",
                select: ["title"],
                populate: { path: "userId", select: ["firstName"] }
            })
            .populate({
                path: "userId",
                select: ["firstName"]
            })
            .lean().exec();
        return res.status(200).send(comments);
    }
    catch (err) {
        return res.status(500).send({ message: err.message });
    }
});
app.post("", crudController(Comment).post);
//app.post("", async (req, res) => {
//    try {
//        const comment = await Comment.create(req.body);
//        return res.status(200).send(comment);
//    }
//    catch (err) {
//        res.status(500).send({ message: err.message });
//    }
//});
app.get("/:id", async (req, res) => {
    try {
        const comment = await Comment.findById(req.params.id)
            .populate({
                path: "postId",
                select: ["title"],
                populate: { path: "userId", select: ["firstName"] }
            })
            .populate({
                path: "userId",
                select: ["firstName"]
            })
            .lean().exec();
        return res.status(200).send(comment);
    }
    catch (err) {
        res.status(500).send({ message: err.message });
    }
});
app.patch("/:id", async (req, res) => {
    try {
        const comment = await Comment.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        })
            .populate({
                path: "postId",
                select: ["title"],
                populate: { path: "userId", select: ["firstName"] }
            })
            .populate({ path: "userId", select: ["email"] })
            .lean().exec();
        return res.status(200).send(comment);
    }
    catch (err) {
        res.status(500).send({ message: err.message });
    }
});
app.delete("/:id", crudController(Comment).deleteOne);
//app.delete("/:id", async (req, res) => {
//    try {
//        const comment = await Comment.findByIdAndDelete(req.params.id).lean().exec();
//        return res.status(200).send(comment);
//    }
//    catch (err) {
//        return res.status(500).send({ message: err.message });
//    }
//});

module.exports = app;