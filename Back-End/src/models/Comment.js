import mongoose, { Schema } from "mongoose";

const CommentSchema = new Schema(
  {
    comment: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Comment = mongoose.model("Comment", CommentSchema);

export default Comment;
