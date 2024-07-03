const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    fullName: { require: true, type: String },
    userName: { require: true, type: String },
    email: { require: true, type: String },
    password: { require: true, type: String },
    gender: { require: true, type: String, enum: ["male", "female"] },
    profilePic: { type: String, default: "" }
},{timestamps:true});

const User = mongoose.model("User", userSchema);

module.exports = User;