const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const databaseConnect = require('./database/db');
const authRoutes = require('./routes/authRoutes');
const messageRoutes = require('./routes/messageRoutes');
const userRoutes = require('./routes/userRoutes')

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin:'http://localhost:3000',
    methods:'GET,PUT,POST,PATCH,DELETE',
    credentials:true,
}));

app.use("/api/auth/", authRoutes);
app.use("/api/messages/", messageRoutes);
app.use("/api/users/", userRoutes);


databaseConnect();
app.listen(PORT, () => {
    console.log(`server is running on http://localhost:${PORT}`);
});