const bcrypt = require("bcrypt");
const User = require("../models/user.model");
const errorMessages = require('../constants/errorMessages');
/**
 * Service function to register a new user.
 * @param {string} username - The username of the user.
 * @param {string} email - The email of the user.
 * @param {string} password - The password of the user.
 * @param {string} fullName - The full name of the user.
 * @param {Date} dateOfBirth - The date of birth of the user.
 * @param {string} gender - The gender of the user.
 * @param {string} country - The country of the user.
 * @param {Array} interests - The interests of the user.
 * @param {string} bio - The bio of the user.
 * @param {string} profilePicture - The profile picture of the user.
 * @param {boolean} isAdmin - The isAdmin status of the user.
 * @returns {Promise<void>} A Promise representing the completion of the operation.
 */
exports.registerUser = async (username, email, password, fullName, dateOfBirth, gender, country, interests, bio, profilePicture, isAdmin) => {
  try {
    // Check if the email already exists
    const existingUserWithEmail = await User.findOne({ email });
    if (existingUserWithEmail) {
      throw new Error(errorMessages.EMAIL_ALREADY_EXISTS);
    }

    // Check if the username already exists
    const existingUserWithUsername = await User.findOne({ username });
    if (existingUserWithUsername) {
      throw new Error(errorMessages.USERNAME_ALREADY_EXISTS);
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the user
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
      profilePicture,
      isAdmin
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
    const user = await User.findById(userId).select("-password"); // Exclude password field
    if (!user) {
      throw new Error("User not found");
    }
    return user;
  } catch (error) {
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
      throw new Error("User not found");
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
    const user = await User.findOne({ username }).select("-password");
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

/**
 * Check if a user exists by user ID.
 * @param {string} userId - The ID of the user to check.
 * @returns {Promise<boolean>} A Promise that resolves to true if the user exists, false otherwise.
 * @throws {Error} If an error occurs while checking for the user.
 */
exports.userExists = async (userId) => {
  try {
    const user = await User.findById(userId);
    return !!user;
  } catch (error) {
    throw error;
  }
};

/**
 * Add a book to the user's Currently Reading shelf.
 * @param {string} userId - The ID of the user.
 * @param {string} bookId - The ID of the book to add.
 * @returns {Promise<User>} A Promise that resolves with the updated user object.
 * @throws {Error} If an error occurs while adding the book to the shelf.
 */
exports.addToCurrentlyReading = async (userId, bookId) => {
  // Retrieve the user document from the database
  const user = await User.findById(userId);

  if (!user) {
    throw new Error("User not found");
  }

  // Check if the book is already in the Currently Reading list
  if (user.currentlyReading.includes(bookId)) {
    throw new Error("Book is already in the Currently Reading list");
  }

  // Check if the book is in the Want to Read list
  if (user.wantToRead.includes(bookId)) {
    // Remove the book from the Want to Read list
    user.wantToRead.pull(bookId);
  }

  // Check if the book is in the Read list
  if (user.read.includes(bookId)) {
    // Remove the book from the Read list
    user.read.pull(bookId);
  }

  // Add the book to the Currently Reading list
  user.currentlyReading.push(bookId);

  // Save the updated user document
  await user.save();

  return user;
};

/**
 * Add a book to the user's Want to Read shelf.
 * @param {string} userId - The ID of the user.
 * @param {string} bookId - The ID of the book to add.
 * @returns {Promise<User>} A Promise that resolves with the updated user object.
 * @throws {Error} If an error occurs while adding the book to the shelf.
 */
exports.addToWantToRead = async (userId, bookId) => {
  try {
    const user = await User.findById(userId);

    // Check if book is already in currentlyReading or read shelf, remove it if present
    user.currentlyReading.pull(bookId);
    user.read.pull(bookId);

    // Add book to wantToRead shelf
    if (!user.wantToRead.includes(bookId)) {
      user.wantToRead.push(bookId);
    }

    // Save updated user
    await user.save();
  } catch (error) {
    throw new Error(
      "Error adding book to Want to Read shelf: " + error.message
    );
  }
};

/**
 * Add a book to the user's Read shelf.
 * @param {string} userId - The ID of the user.
 * @param {string} bookId - The ID of the book to add.
 * @returns {Promise<User>} A Promise that resolves with the updated user object.
 * @throws {Error} If an error occurs while adding the book to the shelf.
 */
exports.addToRead = async (userId, bookId) => {
  try {
    const user = await User.findById(userId);

    // Check if book is already in currentlyReading or wantToRead shelf, remove it if present
    user.currentlyReading.pull(bookId);
    user.wantToRead.pull(bookId);

    // Add book to read shelf
    if (!user.read.includes(bookId)) {
      user.read.push(bookId);
    }

    // Save updated user
    await user.save();
  } catch (error) {
    throw new Error("Error adding book to Read shelf: " + error.message);
  }
};

/**
 * Get all users.
 * @returns {Promise<User[]>} A Promise that resolves with an array of user objects.
 * @throws {Error} If an error occurs while fetching the users.
 */
exports.getAllUsers = async () => {
  try {
    const users = await User.find();
    return users;
  } catch (error) {
    throw new Error("Error fetching all users: " + error.message);
  }
};
