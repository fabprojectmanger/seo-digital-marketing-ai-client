import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: { type: String, unique: true, require: true },
  googleTokens: {
    access_token: { type: String },
    refresh_token: { type: String },
    scope: { type: String },
    token_type: { type: String },
    expires_in: { type: Number },
  },
  createdAt: { type: Date, default: Date.now },
});

const Users =  mongoose.models.users || mongoose.model("users", userSchema);

export default Users;
