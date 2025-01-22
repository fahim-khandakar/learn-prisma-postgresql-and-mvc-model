import { Router } from "express";
import UserRoutes from "./userRoutes.js";
import PostRoutes from "./PostRoutes.js";
import CommentRoutes from "./commentRoutes.js";

const router = Router();

router.use("/user", UserRoutes);
router.use("/post", PostRoutes);
router.use("/comment", CommentRoutes);

export default router;
