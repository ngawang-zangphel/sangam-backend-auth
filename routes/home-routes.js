const express = require('express');
const router = express.Router();
const authMiddleware = require('./../middleware/auth-middleware');

//Protec this route if not loggedIn
router.get('/welcome', authMiddleware, (req, res) => {
    const { username, userId, role } = req?.userInfo;
    console.log(username, userId, role);
    res.json({
        message: 'Welcome to home page',
        user: {
            _id: userId,
            username,
            role
        }
    })
});

module.exports = router;