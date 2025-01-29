const express = require("express");
const router = express.Router();
const familiesCtrl = require("../controllers/families");
const ensureLoggedIn = require("../middleware/ensureLoggedIn");

router.get("/members", ensureLoggedIn, familiesCtrl.getMembers);

router.post("/members", ensureLoggedIn, familiesCtrl.addMember);

router.put("/members/:id", ensureLoggedIn, familiesCtrl.updateMember);

router.delete("/members/:id", ensureLoggedIn, familiesCtrl.deleteMember);

router.patch(
  "/members/:id/position",
  ensureLoggedIn,
  familiesCtrl.updatePosition
);

module.exports = router;
