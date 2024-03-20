const bcrypt = require('bcrypt');
const User = require('../models/user.model');

/**
 * Service function to register a new user.
 * @param {object} userData - The user data object containing user details.
 * @returns {Promise<void>} A Promise representing the completion of the operation.
 */
exports.registerUser = async (userData) => {
  try {
    const { username, email, password, fullName, dateOfBirth, gender, country, interests, bio, profilePicture } = userData;

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the user object
    const user = new User({
      username,
      email,
      password: hashedPassword,
      fullName,
      dateOfBirth,
      gender,
      country,
      interests,
      bio,
      profilePicture
    });

    // Save the user to the database
    await user.save();
  } catch (error) {
    throw error;
  }
};


/**
 * Service function to retrieve the profile of a user.
 * @param {string} userId - The ID of the user whose profile is being retrieved.
 * @returns {Promise<Object>} A Promise that resolves with the user profile.
 */
exports.getUserProfile = async (userId) => {
  try {
    const user = await User.findById(userId).select('-password'); // Exclude password field
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  } catch (error) {
    throw error;
  }
};

/**
 * Service function to update the profile of the user.
 * @param {string} userId - The ID of the user whose profile is being updated.
 * @param {object} updatedUserData - The updated user data.
 * @returns {Promise<void>} A Promise representing the completion of the operation.
 */
exports.updateUserProfile = async (userId, updatedUserData) => {
  try {
    const user = await User.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }

    await User.findByIdAndUpdate(userId, updatedUserData);
  } catch (error) {
    throw error;
  }
};

/**
 * Get a user by username.
 * @param {string} username - The username of the user to retrieve.
 * @returns {Promise<User>} A Promise that resolves with the user object, excluding the password field.
 * @throws {Error} If an error occurs while retrieving the user.
 */
exports.getUserByUsername = async (username) => {
  try {
    const user = await User.findOne({ username }).select('-password');
    return user;
  } catch (error) {
    throw error;
  }
};

/**
 * Delete a user by user ID.
 * @param {string} userId - The ID of the user to delete.
 * @returns {Promise<void>} A Promise representing the completion of the delete operation.
 * @throws {Error} If an error occurs while deleting the user.
 */
exports.deleteUser = async (userId) => {
  try {
    // Delete the user from the database
    await User.findByIdAndDelete(userId);
  } catch (error) {
    throw error;
  }
};