/**
 * Authentication Middleware
 * Validates active server-side session before granting access to private resources.
 */

export function requireAuth(req, res, next) {
  if (!req.session || !req.session.userId) {
    return res.status(401).json({
      success: false,
      error: 'Authentication required. Please log in to access this resource.'
    });
  }

  req.user = {
    id: req.session.userId,
    email: req.session.userEmail,
    name: req.session.userName
  };

  next();
}
