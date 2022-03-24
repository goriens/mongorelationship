//USER SCHEMA
//step 1:- creating the schema
const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: false },
    email: { type: String, required: true, },
    password: { type: String, required: true },
},
    {
        versionKey: false,
        timestamps: true,
    }
);

//step 2:creating the model
const User = mongoose.model("user", userSchema); //user > users
module.exports = User;