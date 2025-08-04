import mongoose from "mongoose"; // ✅

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter name"],
    },
    email: {
      type: String,
      required: [true, "Please enter email"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Please enter password"],
      minlength: 6,
    },
    image: {
      type: String,
      default: "",
    },
    role: {
      type: String,
      enum: ["viwer", "user", "admin","Editor"],
      default: "viwer",
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

export default User;
