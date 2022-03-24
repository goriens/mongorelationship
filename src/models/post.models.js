//POST SCHEMA
//step1:creating the schema
const mongoose = require("mongoose");
const postSchema = new mongoose.Schema(
    {
        title: { type: String, required: true },
        body: { type: String, required: true },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user",
            required: true,
        },
        //taggedUserIds: [{ type: mongoose.Schema.ObjectId, ref: "user", required: true }],
    },
    {
        versionKey: false,
        timestamps: true, //createdAT, updatedAt.
    }
);
//step2:creating the model
const Post = mongoose.model("post", postSchema);
module.exports = Post;