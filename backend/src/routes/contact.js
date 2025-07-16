const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const { addFriend } = require('../controllers/contactController');

router.post('/add-friend', authMiddleware, addFriend)

module.exports = router;