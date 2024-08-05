import { GoogleGenerativeAI } from "@google/generative-ai";
import {
  saveCommentIdToUrl,
  saveCommentRepo,
} from "../repository/osintRepository.js";
import { getCommentRepo } from "../repository/commentRepository.js";
import dotenv from "dotenv/config";

// Access your API key as an environment variable (see "Set up your API key" above)
console.log("commentservice", process.env.API_KEY);
const genAI = new GoogleGenerativeAI(process.env.API_KEY);

export async function startAnalisis(prompt, url) {
  // For text-only input, use the gemini-pro model
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });

  const result = await model.generateContent(prompt);
  const response = result.response;
  const text = response.text();

  const saveComment = await saveCommentRepo(text);
  const saveId = await saveCommentIdToUrl({ comment: saveComment, url: url });
  console.log(text);
}

export async function getComment(commentID) {
  const result = await getCommentRepo(commentID);

  return result;
}
