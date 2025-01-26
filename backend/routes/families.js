const express = require("express");
const router = express.Router();
const { addMember, getMembers } = require("../controllers/families");
const ensureLoggedIn = require("../middleware/ensureLoggedIn");

router.post("/members", ensureLoggedIn, addMember);
router.get("/members", ensureLoggedIn, getMembers);

module.exports = router;
