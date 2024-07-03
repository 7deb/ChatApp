const mongoose = require('mongoose');
require('dotenv').config();

const databaseConnect = () =>{
    try {
        mongoose.connect(process.env.DB_URL);
        console.log("connected to database!!");
    } catch (err) {
        console.error(err);
    }
}

module.exports = databaseConnect;