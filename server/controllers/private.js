
const protect = require('../middleware/auth');


exports.getUserDetails = (protect, (req, res, next) => {
  res.send(req.user)
  });