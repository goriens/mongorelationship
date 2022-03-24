const mongoose = require("mongoose");
//COMMENT SCHEMA
//step1:creating the schema
const commentSchema = new mongoose.Schema(
    {
        body: { type: String, required: true },
        postId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "post",
            required: true,
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user",
            required: true,
        }
    },
    {
        versionKey: false,
        timestamps: true,
    }
);
//step:2 creating the model
module.exports = mongoose.model("comment", commentSchema);