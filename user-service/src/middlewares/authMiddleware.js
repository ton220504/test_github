const jwt = require('jsonwebtoken');
const User = require('../models/userModelDB');

// Generate JWT Token
const protect = async(req, res, next)=>{
    let token;
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try {
            token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            const user = await User.findByPk(decoded.id, {attributes:['id', 'name', 'email']});
            if(!user){
                return res.status(401).json({success:false, message:'Not authorized, user not found'})
            }
            req.user = user;
            next();
        } catch (error) {
            return res.status(401).json({success:false, message:'Not authorized, token failed'});
        }
    }
    if(!token){
        return res.status(401).json({success:false, message:'Not authorized, no token'});
    }
        
}

module.exports = {protect};