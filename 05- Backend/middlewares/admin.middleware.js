/**
 * Middleware to authenticate admin users.
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 * @param {function} next - The callback function to proceed to the next middleware.
 */
exports.authenticateAdmin = (req, res, next) => {
    // Check if the user is authenticated
    if (!req.user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    console.log(req.user);
  
    // Check if the authenticated user is an admin
    if (!req.user.isAdmin) {
      return res.status(403).json({ message: 'Forbidden - Admin access required' });
    }
  
    // Proceed to the next middleware if the user is an admin
    next();
  };
  