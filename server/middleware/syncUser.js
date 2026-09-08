const User = require('../models/User');

/**
 * Middleware that finds or creates a User document based on Clerk userId.
 * Must be used AFTER ClerkExpressRequireAuth.
 * Attaches req.dbUser with the MongoDB user document.
 */
const syncUser = async (req, res, next) => {
  try {
    const clerkId = req.auth?.userId;
    if (!clerkId) {
      return res.status(401).json({ success: false, message: 'Not authenticated' });
    }

    // Find existing user by clerkId
    let user = await User.findOne({ clerkId });

    if (!user) {
      // Try to find by email from Clerk (if available in session claims)
      const email = req.auth?.sessionClaims?.email;
      if (email) {
        user = await User.findOne({ email });
        if (user) {
          // Link existing user to Clerk
          user.clerkId = clerkId;
          await user.save();
        }
      }

      if (!user) {
        // Create new user
        const name = req.auth?.sessionClaims?.name ||
                     req.auth?.sessionClaims?.firstName ||
                     'User';
        const email = req.auth?.sessionClaims?.email ||
                      `clerk-${clerkId}@placeholder.com`;

        user = await User.create({
          clerkId,
          name,
          email,
          role: 'user'
        });
      }
    }

    req.dbUser = user;
    next();
  } catch (error) {
    console.error('syncUser error:', error);
    next(error);
  }
};

module.exports = syncUser;
