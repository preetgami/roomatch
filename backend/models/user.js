const mongoose = require("mongoose");

const unquieValid = require("mongoose-unique-validator");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: { type: String, required: true },
  uid: { type: String, required: true },
  age: { type: Number, required: true },
  location: { type: String, required: true },
  career: { type: String, required: true },
  hobby: [{ type: String, required: true }],
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
});
UserSchema.plugin(unquieValid);

module.exports = mongoose.model("User", UserSchema);
