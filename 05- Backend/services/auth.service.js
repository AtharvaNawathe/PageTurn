const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const User = require('../models/user.model');
const errorMessages = require('../constants/errorMessages');
// Load environment variables from .env file
dotenv.config();

/**
 * Service function to authenticate and generate JWT token for a user.
 * @param {string} email - The email address of the user.
 * @param {string} password - The password of the user.
 * @returns {Promise<string>} A Promise that resolves with the JWT token.
 */
exports.authenticateUser = async (email, password) => {
  try {
    // Find the user by email
    const user = await User.findOne({ email });

    // Check if the user exists
    if (!user) {
      throw new Error(errorMessages.USER_NOT_FOUND);
    }

    // Compare the provided password with the hashed password in the database
    const isPasswordValid = await bcrypt.compare(password, user.password);

    // If passwords don't match, throw an error
    if (!isPasswordValid) {
      throw new Error(errorMessages.INCORRECT_PASSWORD);
    }

    // Generate JWT token
    const token = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, process.env.JWT_SECRET, { expiresIn: '1h' });

    return token;
  } catch (error) {
    // Return specific error messages based on the error condition
    switch (error.message) {
      case errorMessages.USER_NOT_FOUND:
        return errorMessages.USER_NOT_FOUND;
      case errorMessages.INCORRECT_PASSWORD:
        return errorMessages.INCORRECT_PASSWORD;
      default:
        return errorMessages.GENERIC_ERROR;
    }
  }
};