
const protect = require('../middleware/auth');
const { authorize } = require ('passport');


exports.getUserDetails = (protect, (req, res, next) => {
  res.send(req.user)
  });