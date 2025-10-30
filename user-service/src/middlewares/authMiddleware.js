const jwt = require('jsonwebtoken');
const userModel = require('../models/userModelDB');

// Generate JWT Token
const protect = async (req, res, next) => {
    let token;

    if (req.headers.authorization?.startsWith('Bearer ')) {
        try {
            token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret123');

            const user = await userModel.findUserById(decoded.id);
            if (!user) {
                return res.status(401).json({ success: false, message: 'Not authorized, user not found' });
            }

            req.user = user;
            return next();

        } catch (error) {
            return res.status(401).json({ success: false, message: 'Not authorized, token failed' });
        }
    }

    return res.status(401).json({ success: false, message: 'Not authorized, no token' });

}

module.exports = { protect };