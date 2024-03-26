const authService = require('../services/auth.service');

/**
 * Controller function to authenticate and login a user.
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 * @param {function} next - The next middleware function.
 */
exports.loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const token = await authService.authenticateUser(email, password);
    res.status(200).json({ token });
  } catch (error) {
    next(error);
  }
};
