import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      unique: true,
      min: [!6 ? "it must be more than 6 char" : ""],
      max: 12,
      required: [true, "Please supply the username"],
    },
    email: {
      type: String,
      unique: true,
      required: [true, "Please, supply the email"],
    },
      gender: {
      type: String,
      required: [true, "Gender is required"],
      enum: ["Male", "Female"],
    },
    avatar: {
      type: String,
    },
    BookList: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "BookList",
    },

    role: { type: String, enum: ["regular", "admin"], default: "regular" },
    password: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

export default User;
