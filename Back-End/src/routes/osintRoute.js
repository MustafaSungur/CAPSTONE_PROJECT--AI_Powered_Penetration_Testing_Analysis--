import { Router } from "express";
import {
  onGetAllOsint,
  onGetComment,
  onStartOsint,
} from "../controllers/osintController.js";

const router = new Router();

router.route("/").post(onStartOsint);
router.route("/urls").post(onGetAllOsint);
router.route("/urls/:id").get(onGetComment);

export default router;
