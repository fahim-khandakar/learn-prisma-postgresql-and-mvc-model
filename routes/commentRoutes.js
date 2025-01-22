import { Router } from "express";
import {
  createComment,
  deleteComment,
  fetchComments,
  showComment,
  updateComment,
} from "../Controller/CommentController.js";

const router = Router();

router
  .get("/", fetchComments)
  .post("/", createComment)
  .put("/:id", updateComment)
  .delete("/:id", deleteComment)
  .get("/:id", showComment);

export default router;
