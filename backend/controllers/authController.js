const bcrypt = require('bcrypt');
const user = require('../models/userModel');
const generateToken = require('../utility/genToken');

const signup = async (req, res) => {
    try {
        const { fullName, userName, email, password, confirmedPassword, gender } = req.body;
        if (!fullName || !userName || !email || !password) {
            return res.status(400).json({ error: "all fields are nescessary" });
        }

        if (password !== confirmedPassword) {
            return res.status(400).json({ error: "passwords do not match" });
        }

        const existingUser = await user.findOne({ email, userName });
        if (existingUser) {
            return res.status(401).json({ error: "user already exists" });
        }

        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);

        // https://avatar-placeholder.iran.liara.run/
        const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${userName}`;
        const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${userName}`;

        const newUser = new user({
            fullName,
            userName,
            email,
            password: hashedPassword, gender,
            profilePic: gender === "male" ? boyProfilePic : girlProfilePic,
        })

        if (newUser) {

            await newUser.save();

            generateToken(newUser._id, res);

            res.status(201).json({
                _id: newUser._id,
                fullName: newUser.fullName,
                username: newUser.userName,
                profilePic: newUser.profilePic,

            });
        } else {
            res.status(400).json({ error: "Invalid user data" });
        }
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ error: error.message });
    }
}

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