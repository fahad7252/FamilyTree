const express = require("express");
const router = express.Router();
const profilesCtrl = require("../controllers/profiles");
const ensureLoggedIn = require("../middleware/ensureLoggedIn");

router.get("/", ensureLoggedIn, profilesCtrl.getProfile);
router.put("/", ensureLoggedIn, profilesCtrl.updateProfile);

module.exports = router;
