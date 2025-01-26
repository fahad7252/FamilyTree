const mongoose = require("mongoose");
const { Schema } = mongoose;
const User = require("./user");

const familyMemberSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    name: { type: String, required: true },
    relationship: { type: String, required: true },
    birthDate: { type: Date, required: true },
  },
  {
    timestamps: true,
  }
);

const FamilyMember = mongoose.model("FamilyMember", familyMemberSchema);

module.exports = { FamilyMember };
