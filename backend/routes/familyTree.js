const express = require("express");
const router = express.Router();
const familyTreeCtrl = require("../controllers/familyTree");

router.get("/", familyTreeCtrl.getAllMembers);
router.get("/:id", familyTreeCtrl.getMember);
router.post("/", familyTreeCtrl.createMember);
router.put("/:id", familyTreeCtrl.updateMember);
router.delete("/:id", familyTreeCtrl.deleteMember);

router.put("/:id/details", familyTreeCtrl.updateMemberDetails);

module.exports = router;
