const userModel = require('../models/userModel');

// Get all users
async function getAllUsers(req, res, next){
    try {
        const data = userModel.findAll();
        res.status(200).json({success:true, data});
    } catch (error) {
        next(error);
    }
}

//get user by id
async function getUserById(req, res, next){
    try {
        const {id} = req.params;
        const user = userModel.findById(id);
        if(!user) return res.status(404).json({success:false, message:'User not found'});
        res.status(200).json({success:true, data:user});
    } catch (error) {
        next(error);
    }
}

//create new user
async function createUser(req, res, next){
    try {
        const {name, email} = req.body;
        if(!name || !email) return res.status(400).json({success:false, message:'Name and email are required'});
        const newUser = userModel.createUser({name, email});
        res.status(201).json({success:true, data:newUser});
    } catch (error) {
        next(error);
    }
}

module.exports = {
    getAllUsers,
    getUserById,
    createUser
}