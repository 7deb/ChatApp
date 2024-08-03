const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser'); 
const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');
const messageRoutes = require("./routes/messageRoutes");
const databaseConnect = require('./database/db');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser());

app.use('/api/auth', authRoutes);
app.use('/api/messages',messageRoutes);
app.use('/api/users',userRoutes);
databaseConnect();
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
