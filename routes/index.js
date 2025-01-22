import { Router } from "express";
import UserRoutes from "./userRoutes.js";
import PostRoutes from "./PostRoutes.js";
import CommentRoutes from "./commentRoutes.js";

const router = Router();

router
  .use("/user", UserRoutes)
  .use("/post", PostRoutes)
  .use("/comment", CommentRoutes);

export default router;
