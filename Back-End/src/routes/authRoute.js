import { Router } from "express";
import {
  onDelete,
  onLogin,
  onRegister,
  onUpdateUser,
} from "../controllers/userController.js";
import tokenControll from "../middleware/authMiddleware.js";
const router = new Router();

router.route("/login").post(onLogin);
router.route("/register").post(onRegister);
router.route("/delete").post(tokenControll, onDelete);
router.route("/update").patch(tokenControll, onUpdateUser);

export default router;
