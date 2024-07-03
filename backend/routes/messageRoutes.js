const express = require('express');
const router = express.Router();

const {getMessage,sendMessage} = require('../controllers/messageController');
const authToken = require('../middleware/middleware');

router.post("/send/:id",authToken,sendMessage);
router.get("/:id",authToken,getMessage);


module.exports = router;