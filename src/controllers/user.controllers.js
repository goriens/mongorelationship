//USERS CRUD
const express = require("express");
const User = require("../models/user.models");
const crudController = require("./crud.controllers");
const app = express();

app.get("", async (req, res) => {
    try {
        const users = await User.find().lean().exec();
        return res.status(200).send(users);
        //res.send(users)
    }
    catch (err) {
        return res.status(500).send({ message: "Something went wrong.. try again later" });
    }
});
app.post("", crudController(User).post);
//app.post("", async (req, res) => {
//    try {
//        const user = await User.create(req.body);
//        return res.status(200).send(user);
//
//    }
//    catch (err) {
//        return res.status(500).send({ message: err.message });
//    }
//});
//body = req.body,,, 
//url = req.params,,, 
//query string = req.query;
app.get("/:id", async (req, res) => {
    try {
        //console.log(req.params);
        const user = await User.findById(req.params.id).lean().exec();
        return res.status(200).send(user);
        //db.users.findOne({_id:Object("622b074bfdc85747aa1a29d9")});
    }
    catch (err) {
        return res.status(500).send({ message: err.message });
    }
});
app.patch("/:id", async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        }).lean().exec();
        return res.status(200).send(user);
    }
    catch (err) {
        return res.status(500).send({ message: err.message });
    }
});
app.delete("/:id", crudController(User).deleteOne);
//app.delete("/:id", async (req, res) => {
//    try {
//        const user = await User.findByIdAndDelete(req.params.id).lean().exec();
//        return res.status(200).send(user);
//    }
//    catch (err) {
//        return res.status(500).send(user);
//    }
//});

module.exports = app;