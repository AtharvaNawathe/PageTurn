const bcrypt = require('bcrypt');
const User = require('../models/user.model');
const userService = require('../services/user.service')
const { isValidEmail } = require('../utils/validations');
/**
 * Controller function to register a new user.
 */
exports.registerUser = async (req, res, next) => {
  try {
    const { username, email, password, fullName, dateOfBirth, gender, country, interests, bio, profilePicture, isAdmin } = req.body;
    
    const missingFields = [];
    if (!username) missingFields.push('Username');
    if (!email) missingFields.push('Email');
    if (!password) missingFields.push('Password');
    if (!fullName) missingFields.push('Full Name');

    if (missingFields.length > 0) {
      return res.status(400).json({ error: `Missing required fields: ${missingFields.join(', ')}` });
    }

    
    if (!isValidEmail(email)) {
      return res.status(400).json({ error: 'Invalid email address' });
    }

    if (password.length < 6) {
      return res.status(400).json({ error: 'Password should be at least 6 characters long' });
    }

    if (gender && !['male', 'female', 'other'].includes(gender)) {
      return res.status(400).json({ error: 'Invalid gender value' });
    }

    // If isAdmin is not provided, set its default value to false
    const isAdminValue = isAdmin !== undefined ? isAdmin : false;

    // Call the user service to register the user
    await userService.registerUser(username, email, password, fullName, dateOfBirth, gender, country, interests, bio, profilePicture, isAdminValue);

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    next(error);
  }
};

/**
 * Controller function to get the profile of the authenticated user.
 */
exports.getUserProfile = async (req, res, next) => {
    try {
      const userId = req.user.id;
      const userProfile = await userService.getUserProfile(userId);
      res.status(200).json(userProfile);
    } catch (error) {
      next(error);
    }
};

/**
 * Controller function to handle updating the profile of the currently authenticated user.
 */
exports.updateUserProfile = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const updatedUserData = req.body;
    await userService.updateUserProfile(userId, updatedUserData);
    res.status(204).json({ message: 'Profile Updated Sucessfully' });
  } catch (error) {
    next(error);
  }
};

/**
 * Controller function to get a user by username.
 */
exports.getUserByUsername = async (req, res, next) => {
  try {
    const username = req.params.username;
    const user = await userService.getUserByUsername(username);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    next(error);
  }
};

/**
 * Controller function to delete a user.
 */
exports.deleteUser = async (req, res, next) => {
  try {
    const userId = req.user.id; 
    await userService.deleteUser(userId);
    res.status(204).end(); 
  } catch (error) {
    next(error);
  }
};

/**
 * Controller function to add a book to the Currently Reading shelf of the authenticated user.
 */
exports.addToCurrentlyReading = async (req, res, next) => {
  try {
      const userId = req.user.id; 
      const { bookId } = req.body;
      const user = await userService.addToCurrentlyReading(userId, bookId);
      res.status(200).json({ message: 'Book added to Currently Reading list', user: user });
  } catch (error) {
      next(error);
  }
};

/**
 * Controller function to add a book to the Want to Read shelf of the authenticated user.
 */
exports.addToWantToRead = async (req, res, next) => {
  try {
      const userId = req.user.id;
      const { bookId } = req.body;
      const user = await userService.addToWantToRead(userId, bookId);
      res.status(200).json({ message: 'Book added to Want to Read shelf successfully', user: user  });
  } catch (error) {
      next(error);
  }
};


/**
 * Controller function to add a book to the Read shelf of the authenticated user.
 */
exports.addToRead = async (req, res, next) => {
  try {
        const userId = req.user.id;
      const { bookId } = req.body;
      await userService.addToRead(userId, bookId);
      res.status(200).json({ message: 'Book added to Read shelf successfully' });
  } catch (error) {
      next(error);
  }
};


/**
 * Controller function to get all users. 
 */
exports.getAllUsers = async (req, res, next) => {
  try {
      const users = await userService.getAllUsers();
      res.status(200).json(users);
  } catch (error) {
      next(error);
  }
};

/**
 * Controller function to get user from provided userId. 
 */
exports.getUserById = async (req, res) => {
  const userId = req.params.userId;
  try {
      const user = await userService.getUserById(userId);
      res.json(user);
  } catch (error) {
      console.error('Error fetching user:', error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
};