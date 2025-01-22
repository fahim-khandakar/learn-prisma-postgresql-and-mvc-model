import { Router } from "express";
import {
  createPost,
  updatePost,
  fetchPosts,
  showPost,
  deletePost,
  searchPost,
} from "../Controller/PostController.js";

const router = Router();

router
  .get("/", fetchPosts)
  .get("/search", searchPost)
  .post("/", createPost)
  .put("/:id", updatePost)
  .delete("/:id", deletePost)
  .get("/:id", showPost);

export default router;
