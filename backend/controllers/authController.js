const bcrypt = require('bcrypt');
const user = require('../models/userModel');
const generateToken = require('../utility/genToken');

const signup = async (req, res) => {
    try {
        const { fullName, username, email, password, confirmPassword, gender } = req.body;

        if (!fullName || !username || !email || !password || !confirmPassword || !gender) {
            return res.status(400).json({ error: 'All fields are necessary' });
        }

        if (password !== confirmPassword) {
            return res.status(400).json({ error: "Passwords do not match" });
        }

        const existingUser = await user.findOne({ $or: [{ email }, { username }] });
        if (existingUser) {
            return res.status(401).json({ error: "User already exists" });
        }

        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);

        const profilePic = gender === "male"
            ? `https://avatar.iran.liara.run/public/boy?username=${username}`
            : `https://avatar.iran.liara.run/public/girl?username=${username}`;

        const newUser = new user({
            fullName,
            username,
            email,
            password: hashedPassword,
            gender,
            profilePic,
        });
        await newUser.save();
        generateToken(newUser._id, res);
        res.status(201).json({
            _id: newUser._id,
            fullName: newUser.fullName,
            username: newUser.username,
            profilePic: newUser.profilePic,
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

const login = async (req, res) => {
    try {
        const { userName, password } = req.body;
        if (!userName || !password) {
            return res.status(400).json({ error: "all fields are required!!" });
        }

        const existingUser = await user.findOne({ userName });
        if (!existingUser) {
            return res.status(400).json({ error: "user does not exist" });
        }

        const comparePassword = await bcrypt.compare(password, existingUser.password);
        if(!comparePassword){
            return res.status(400).json({error:"Passwords don't match"});
        }

        generateToken(existingUser._id, res);

        res.status(200).json({  
            _id: existingUser._id,
            fullName: existingUser.fullName,
            username: existingUser.userName,
            profilePic: existingUser.profilePic,
        });

    } catch (error) {
        console.log("Error in login controller", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

const logout = (req, res) => {
    try {
        res.cookie("jwt", "", { maxAge: 0 });
        res.status(200).json({ message: "Logged out successfully" });
    } catch (error) {
        console.log("Error in logout controller", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }

}
module.exports = { signup, login, logout };