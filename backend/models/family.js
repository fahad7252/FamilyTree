const mongoose = require("mongoose");
const { Schema } = mongoose;
const User = require("./user");

const familyTreeSchema = new Schema(
  {
    name: { type: String, required: true },
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  {
    timestamps: true,
  }
);
familyTreeSchema.index({ user: 1 });
const FamilyTree = mongoose.model("FamilyTree", familyTreeSchema);

const familyMemberSchema = new Schema(
  {
    name: { type: String, required: true },
    birthDate: { type: Date },
    gender: { type: String },
    profilePic: { type: String },
    bio: { type: String },
  },
  {
    timestamps: true,
  }
);
const FamilyMember = mongoose.model("FamilyMember", familyMemberSchema);

const membershipSchema = new Schema(
  {
    member: {
      type: Schema.Types.ObjectId,
      ref: "FamilyMember",
      required: true,
    },
    tree: { type: Schema.Types.ObjectId, ref: "FamilyTree", required: true },
    relationship: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

membershipSchema.index({ member: 1, tree: 1 }, { unique: true });
const Membership = mongoose.model("Membership", membershipSchema);

module.exports = {
  FamilyTree,
  FamilyMember,
  Membership,
};
