import { Router } from "express";
import {
  createUser,
  updateUser,
  fetchUsers,
  showUser,
  deleteUser,
} from "../Controller/UserController.js";

const router = Router();

router.get("/", fetchUsers);
router.post("/", createUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);
router.get("/:id", showUser);

export default router;
