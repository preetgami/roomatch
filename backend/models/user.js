const mongoose = require("mongoose");

const unquieValid = require("mongoose-unique-validator");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: { type: String, required: true },
  uid: { type: String, required: true },
  age: { type: Number },
  location: { type: String },
  career: { type: String },
  hobby: [{ type: String }],
  description: { type: String },
  likes: {
    type: Map,
    of: { type: mongoose.Types.ObjectId, ref: "User" },
    required: true,
    default: new Map(),
  },
  rejects: {
    type: Map,
    of: { type: mongoose.Types.ObjectId, ref: "User" },
    required: true,
    default: new Map(),
  },
  matches: {
    type: Map,
    of: { type: mongoose.Types.ObjectId, ref: "User" },
    required: true,
    default: new Map(),
  },
  pictures: [{ type: String }],
});
UserSchema.plugin(unquieValid);

module.exports = mongoose.model("User", UserSchema);
