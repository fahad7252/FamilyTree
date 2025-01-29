const Family = require("../models/families");

async function getMembers(req, res) {
  try {
    const members = await Family.find({ user: req.user._id });
    res.json(members);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

async function addMember(req, res) {
  try {
    req.body.user = req.user._id;
    const member = await Family.create(req.body);
    res.json(member);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

async function updateMember(req, res) {
  try {
    const updatedMember = await Family.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      req.body,
      { new: true }
    );
    if (!updatedMember) {
      return res.status(404).json({ error: "Member not found" });
    }
    res.json(updatedMember);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

async function deleteMember(req, res) {
  try {
    const deletedMember = await Family.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id,
    });
    if (!deletedMember) {
      return res.status(404).json({ error: "Member not found" });
    }
    res.json({ message: "Member deleted successfully" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

async function updatePosition(req, res) {
  try {
    const updatedMember = await Family.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      { position: req.body },
      { new: true }
    );
    if (!updatedMember) {
      return res.status(404).json({ error: "Member not found" });
    }
    res.json(updatedMember);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}
async function updateMemberDetails(req, res) {
  try {
    const updatedMember = await Family.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      { details: req.body },
      { new: true }
    );
    if (!updatedMember) {
      return res.status(404).json({ error: "Member not found" });
    }
    res.json(updatedMember);
  } catch (err) {
    res.status(400).json({ error: "Failed to update member details" });
  }
}

module.exports = {
  getMembers,
  addMember,
  updateMember,
  deleteMember,
  updatePosition,
  updateMemberDetails,
};
