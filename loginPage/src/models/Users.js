// models/User.js
import mongoose from "mongoose";
import bcrypt from "bcryptjs";

var userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

// Hash password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);  
  next();
});

//Adding custom method to check the passwords authenticity
userSchema.method({
  isValidPassword: function (password) {
    try {
      return bcrypt.compare(password, this.password);            
    } catch (err) {      
      throw new Error(err);
    }
  },
});

export default mongoose.model("User", userSchema);
