import pingURL from "../libs/pingURL.js";
import { getAllOsintRepo, saveUrlRepo } from "../repository/osintRepository.js";
import { runOsintScan } from "../utils/runOsintScan.js";

export async function startOsint({ url, user }) {
  try {
    const checkUrl = await pingURL(url);

    if (!checkUrl) {
      throw new error("URL not available");
    }
    const parseUrl = new URL(url);

    const saveUrl = await saveUrlRepo({ url, user });

    // Initiate background scan
    runOsintScan({ parseUrl, saveUrl });

    return "Request received. OSINT scan initiated."; // Immediate response
  } catch (error) {
    throw new Error(`Error: ${error}`);
  }
}

export async function getAllOsint(userId) {
  try {
    const urls = await getAllOsintRepo(userId);

    return urls;
  } catch (error) {
    throw new Error(`Error: ${error}`);
  }
}
