import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
  {
    firstname: {
      type: String,
      required: [true, "Firstname is required"],
      lowercase: true,
    },
    lastname: {
      type: String,
      required: [true, "Lastname name is required"],
      lowercase: true,
    },
    email: {
      type: String,
      required: [true, "Email name is required"],
      unique: true,
    },

    password: {
      type: String,
      required: [true, "Password name is required"],
      minlength: [6, "At least 6 characters"],
    },
    urls: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Url",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

export default User;
