const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    const authheader = req.headers['authorization'];
    console.log(authheader);

    const token = authheader && authheader.split(' ')[1];
    console.log(token);
    if (!token) {
        return res.status(401).json({
            success: false,
            message: 'Access Denied. No Login Provided. Please login to continue'
        });
    }

    //if token there then decode the token
    try {
        const decodedTokenInfo = jwt.verify(token, process?.env?.JWT_SECRET_KEY);
        req.userInfo = decodedTokenInfo;
        console.log(decodedTokenInfo);
        next();
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Access Denied. No Login Provided. Please login to continue'
        });
    }
}

module.exports = authMiddleware;