// middleware/adminMiddleware.js
module.exports = function (req, res, next) {
  // For demo, assume admin mode from header; use Auth/JWT system in production
  if (req.headers['x-admin'] === 'true') return next();
  res.status(403).json({ error: 'Admin only action!' });
};