// // roleMiddleware.js

// export const isAdmin = (req, res, next) => {
//   if (req.user?.role !== "admin") {
//     return res.status(403).json({ message: "Access denied: Admins only" });
//   }
//   next();
// };

// export const isUserOrMember = (req, res, next) => {
//   if (["admin", "member", "user"].includes(req.user?.role)) {
//     return next();
//   }
//   return res.status(403).json({ message: "Access denied" });
// };
// roleMiddleware.js

/**
 * Middleware to check if the authenticated user has an 'admin' role.
 * Assumes req.user has been populated by a preceding authentication middleware (e.g., verifyToken).
 */
export const isAdmin = (req, res, next) => {
  // Log the user object and role for debugging
  console.log('isAdmin Middleware: req.user =', req.user);
  console.log('isAdmin Middleware: req.user?.role =', req.user?.role);

  if (req.user && req.user.role === "admin") {
    console.log('isAdmin Middleware: Access granted (Admin).');
    return next(); // User is an admin, proceed to the next middleware/controller
  } else {
    console.warn('isAdmin Middleware: Access denied (Not Admin).');
    return res.status(403).json({ message: "Access denied: Admins only" });
  }
};

/**
 * Middleware to check if the authenticated user has 'admin', 'member', or 'user' role.
 * Assumes req.user has been populated by a preceding authentication middleware (e.g., verifyToken).
 */
export const isUserOrMember = (req, res, next) => {
  // Log the user object and role for debugging
  console.log('isUserOrMember Middleware: req.user =', req.user);
  console.log('isUserOrMember Middleware: req.user?.role =', req.user?.role);

  const allowedRoles = ["admin", "member", "user"];
  const userRole = req.user?.role; // Safely get the role

  if (userRole && allowedRoles.includes(userRole)) {
    console.log(`isUserOrMember Middleware: Access granted (Role: ${userRole}).`);
    return next(); // User has an allowed role, proceed
  } else {
    console.warn(`isUserOrMember Middleware: Access denied (Role: ${userRole}).`);
    return res.status(403).json({ message: "Access denied: Requires admin, member, or user role." });
  }
};
