const { clerkMiddleware, requireAuth } = require('@clerk/express');

// Middleware that attaches Clerk auth info to req.auth (optional)
const withAuth = clerkMiddleware({
  publishableKey: process.env.CLERK_PUBLISHABLE_KEY,
  secretKey: process.env.CLERK_SECRET_KEY,
});

// Middleware that requires authentication - with error handling
const requireClerkAuth = (req, res, next) => {
  try {
    const authMiddleware = requireAuth({
      publishableKey: process.env.CLERK_PUBLISHABLE_KEY,
      secretKey: process.env.CLERK_SECRET_KEY,
    });
    authMiddleware(req, res, next);
  } catch (error) {
    console.error('Clerk auth error:', error.message);
    return res.status(401).json({ success: false, message: 'Not authenticated' });
  }
};

module.exports = { withAuth, requireClerkAuth };
