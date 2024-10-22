import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  contact: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  about: {
    type: String,
    default: "",
  },
  gender: {
    type: String,
    enum: ["male", "female"],
    default: "male",
  },
  avatar: {
    type: String,
    default: "https://avatar.iran.liara.run/public/boy",
  },
});

export const User = mongoose.model('User', UserSchema);

