/**
 * Middleware to authenticate admin users.
 */
exports.authenticateAdmin = (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    console.log(req.user);
    if (!req.user.isAdmin) {
      return res.status(403).json({ message: 'Forbidden - Admin access required' });
    }
    next();
  };
  