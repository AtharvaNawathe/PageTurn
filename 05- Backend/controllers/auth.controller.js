const authService = require('../services/auth.service');

/**
 * Controller function to authenticate and login a user.
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 * @param {function} next - The next middleware function.
 */
exports.loginUser = async (req, res, next) => {
  try {
    // Extract email and password from the request body
    const { email, password } = req.body;

    // Call the service function to authenticate the user
    const token = await authService.authenticateUser(email, password);

    // Send the JWT token in the response
    res.status(200).json({ token });
  } catch (error) {
    next(error);
  }
};
