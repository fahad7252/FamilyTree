const { FamilyMember } = require("../models/family");

async function addMember(req, res) {
  try {
    console.log("Received data:", req.body);
    console.log("User ID:", req.user ? req.user._id : "No user ID found");

    if (!req.user || !req.user._id) {
      return res.status(400).json({ error: "User not authenticated" });
    }

    const member = await FamilyMember.create({
      name: req.body.name,
      birthDate: req.body.birthDate,
      relationship: req.body.relationship,
      user: req.user._id,
    });

    console.log("Created member:", member);
    res.status(201).json(member);
  } catch (err) {
    console.error("Error adding member:", err.message);
    res.status(500).json({ error: err.message });
  }
}

async function getMembers(req, res) {
  try {
    console.log("Fetching members for user:", req.user._id);

    const members = await FamilyMember.find({ user: req.user._id });
    console.log("Fetched members:", members);
    res.json(members);
  } catch (err) {
    console.error("Error fetching members:", err.message);
    res.status(500).json({ error: err.message });
  }
}

module.exports = {
  addMember,
  getMembers,
};
