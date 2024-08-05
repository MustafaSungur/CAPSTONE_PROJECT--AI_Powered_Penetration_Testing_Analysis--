import mongoose, { Schema } from "mongoose";

const urlSchema = new Schema(
  {
    url: {
      type: String,
      trim: true,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    output: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "OutPut",
      default: null,
    },
    comment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "OutPut",
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

const Url = mongoose.model("Url", urlSchema);

export default Url;
