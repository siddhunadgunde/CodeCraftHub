const User = require('../models/userModel');

// Function to find user by ID
exports.findUserById = async (userId) => {
    try {
            const user = await User.findById(userId);        
            if (!user) throw new Error('User not found');        
                return user;    
        } catch (error) {        
            throw new Error(error.message);    
        }
    };