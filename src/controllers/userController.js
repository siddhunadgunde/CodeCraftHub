// Import the User model for database interactions
const User = require('../models/userModel');
// Import bcrypt for password hashing
const bcrypt = require('bcrypt');
// Import jsonwebtoken for generating tokens
const jwt = require('jsonwebtoken');

// Register a new user
exports.registerUser = async (req, res) => {
    // Destructure username, email, and password from the request body
    const { username, email, password } = req.body;
    try {
        // Hash the password with a salt round of 10
        const hashedPassword = await bcrypt.hash(password, 10);
        // Create a new user instance with the hashed password
        const newUser = new User({ username, email, password: hashedPassword });
        // Save the new user to the database
        await newUser.save();
        // Respond with a success message
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        // Handle any errors that occur during registration
        res.status(500).json({ message: 'Error registering user', error: error.message });
    }
};

// User login
exports.loginUser = async (req, res) => {
    // Destructure email and password from the request body
    const { email, password } = req.body;
    try {
        // Find the user in the database by email
        const user = await User.findOne({ email });
        // If user is not found, respond with a 404 status
        if (!user) return res.status(404).json({ message: 'User not found' });

        // Compare the provided password with the stored hashed password
        const isMatch = await bcrypt.compare(password, user.password);
        // If passwords do not match, respond with a 401 status
        if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

        // Generate a JWT token with the user's ID and secret
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        // Respond with the generated token
        res.json({ token });
    } catch (error) {
        // Handle any errors that occur during login
        res.status(500).json({ message: 'Error logging in', error: error.message });
    }
};