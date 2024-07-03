const express = require('express');
const authToken = require('../middleware/middleware');
const getUsersForSidebar = require('../controllers/userController');
const router = express.Router();

router.get('/',authToken,getUsersForSidebar);

module.exports = router;