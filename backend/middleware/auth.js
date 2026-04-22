/**
 * Authentication middleware — verifies JWT tokens and checks admin role.
 * Exports two middleware functions: authMiddleware and adminOnly.
 */

const jwt = require('jsonwebtoken');

/**
 * Verify the JWT token from the Authorization header.
 * Attaches the decoded payload (id, email, role) to req.user.
 */
const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid or expired token.' });
  }
};

/**
 * Check that the authenticated user has the 'admin' role.
 * Must be used after authMiddleware.
 */
const adminOnly = (req, res, next) => {
  if (!req.user || req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Forbidden. Admin access required.' });
  }
  next();
};

module.exports = { authMiddleware, adminOnly };
