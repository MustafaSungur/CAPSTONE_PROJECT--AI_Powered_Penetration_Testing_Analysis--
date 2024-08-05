import Comment from "../models/Comment.js";

export async function getCommentRepo(commentID) {
  try {
    const comment = await Comment.findById(commentID);

    if (!comment) {
      throw new Error("Comment not found");
    }

    return comment;
  } catch (error) {
    throw new Error(`Error: ${error.message}`);
  }
}
