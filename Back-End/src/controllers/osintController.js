import { getComment } from "../services/commentService.js";
import { getAllOsint, startOsint } from "../services/osintService.js";
export async function onStartOsint(req, res) {
  try {
    const { url, user } = req.body;

    const result = await startOsint({ url, user });
    if (!result) {
      res.status(400).json({ status: "failed" });
    }

    res.status(201).json({ message: "success" });
  } catch (error) {
    res.status(500).json(error);
  }
}

export async function onGetAllOsint(req, res) {
  try {
    const { user } = req.body;
    console.log(user);
    const result = await getAllOsint(user);
    if (!result) {
      res.status(400).json({ status: "failed" });
    }
    res.status(201).json({ message: result });
  } catch (error) {
    res.status(500).json(error);
  }
}

export async function onGetComment(req, res) {
  try {
    const commentID = req.params.id;
    console.log("commentid", commentID);

    const result = await getComment(commentID);
    console.log("result", result);
    if (!result) {
      res.status(400).json({ status: "failed" });
    }
    res.status(201).json({ message: result });
  } catch (error) {
    res.status(500).json(error);
  }
}
