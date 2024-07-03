const jwt = require('jsonwebtoken');

const generateToken = async (userId, res) => {
    const jwtToken = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "1d" });

    // console.log('Generated Token:', jwtToken); // Log the token for verification

    res.cookie("token", jwtToken, {
        maxAge: 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: "strict",
        secure: process.env.NODE_ENV !== "development",
    });
}

module.exports = generateToken;
