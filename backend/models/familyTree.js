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
    details: {
      birthDate: {
        type: Date,
      },
      birthPlace: {
        type: String,
        trim: true,
      },
      occupation: {
        type: String,
        trim: true,
      },
      address: {
        type: String,
        trim: true,
      },
      contact: {
        type: String,
        trim: true,
      },
      notes: {
        type: String,
        trim: true,
      },
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Member", MemberSchema);
