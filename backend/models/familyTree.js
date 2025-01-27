// models/familyTree.js
const mongoose = require("mongoose");

const MemberSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    type: {
      type: String,
      enum: ["self", "parent", "child", "sibling", "spouse"],
      required: true,
    },
    level: {
      type: Number,
      required: true,
    },
    position: {
      x: { type: Number, required: true },
      y: { type: Number, required: true },
    },
  },
  {
    timestamps: true,
  }
);

const ConnectionSchema = new mongoose.Schema({
  from: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Member",
    required: true,
  },
  to: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Member",
    required: true,
  },
  relationshipType: {
    type: String,
    enum: ["parent-child", "spouse", "sibling"],
    required: true,
  },
});

module.exports = {
  Member: mongoose.model("Member", MemberSchema),
  Connection: mongoose.model("Connection", ConnectionSchema),
};
