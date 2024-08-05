import Comment from "../models/Comment.js";
import OutPut from "../models/Output.js";
import Url from "../models/URL.js";
import User from "../models/User.js";
import { saveUserUrlId } from "./userRepository.js";

export async function saveUrlRepo({ url, user }) {
  try {
    const result = await Url.create({ url: url, user: user });
    const pushId = await saveUserUrlId(result);

    if (!pushId) {
      throw new Error(`Could not saved url id: ${error.message}`);
    }

    return result;
  } catch (error) {
    throw new Error(`Error: ${error.message}`);
  }
}

export async function saveOutputRepo(output) {
  try {
    const result = await OutPut.create({ output: output });
    return result;
  } catch (error) {
    throw new Error(`Error: ${error.message}`);
  }
}

export async function saveCommentRepo(comment) {
  try {
    const result = await Comment.create({ comment: comment });
    return result;
  } catch (error) {
    throw new Error(`Error: ${error.message}`);
  }
}
export async function saveOutputIdToUrl({ url, output }) {
  try {
    const result = await Url.findById(url._id);

    result.output = output._id;
    await result.save();

    return result;
  } catch (error) {
    throw new Error(`Error: ${error.message}`);
  }
}

export async function saveCommentIdToUrl({ url, comment }) {
  try {
    const result = await Url.findById(url._id);

    result.comment = comment._id;
    await result.save();

    return result;
  } catch (error) {
    throw new Error(`Error: ${error.message}`);
  }
}

export async function getAllOsintRepo(userId) {
  try {
    const user = await User.findById(userId);
    if (!user) {
      throw new Error("User not found");
    }

    const urls = await Url.find({ user: userId }).sort("-createdAt");
    return urls;
  } catch (error) {
    throw new Error(`Error: ${error.message}`);
  }
}
