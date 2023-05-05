const mongoose = require ("mongoose");

const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      min: 2,
      max: 50,
    },
    lastName: {
      type: String,
      required: true,
      min: 2,
      max: 50,
    },
    email: {
      type: String,
      required: true,
      max: 50,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      min: 5,
    },
    phone:{
        type:String,
        required:true
    },
    role:{
      type:String,
      enum: ["user", "admin", "superadmin"],
      default:'user'
    },

    resetToken: String,
    resetTokenExpiration: Date
},
  {timestamps: true }

);

const User = mongoose.model("User", UserSchema);
module.exports =User;