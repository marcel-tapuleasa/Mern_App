const express = require("express");
const router = express.Router();
const { getUserDetails } = require("../controllers/private");
const { protect } = require("../middleware/auth");

router.route("/me").get(protect, getUserDetails);

module.exports = router;