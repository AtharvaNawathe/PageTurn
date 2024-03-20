const bcrypt = require('bcrypt');
const User = require('../models/user.model');

/**
 * Controller function to register a new user.
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 * @param {function} next - The next middleware function.
 * @returns {Promise<void>} A Promise representing the completion of the operation.
 */
exports.registerUser = async (req, res, next) => {
  try {
    const { username, email, password, fullName, dateOfBirth, gender, country, interests, bio, profilePicture } = req.body;

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
      profilePicture
    });

    // Save the user to the database
    await user.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    next(error);
  }
};

/**
 * Controller function to get the profile of the authenticated user.
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 * @param {function} next - The next middleware function.
 */
exports.getUserProfile = async (req, res, next) => {
    try {
      // Get the authenticated user's ID from the request object (assuming it's stored in req.user)
      const userId = req.user.id;
  
      // Call the service function to fetch the user profile
      const userProfile = await userService.getUserProfile(userId);
  
      // Send the user profile in the response
      res.status(200).json(userProfile);
    } catch (error) {
      next(error);
    }
};