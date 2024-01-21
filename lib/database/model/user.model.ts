import { Schema, model, models } from "mongoose";

const UserSchema = new Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  imageUrl: { type: String, required: false },
  role: { type: String, required: false },
  status: { type: String, required: false },
  createdAt: { type: Date, default: Date.now },
  lastUpdatedAt: { type: Date, default: Date.now }
});

const User = models.User || model("User", UserSchema);

export default User;
