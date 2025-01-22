import { Router } from "express";
import {
  createUser,
  updateUser,
  fetchUsers,
  showUser,
  deleteUser,
} from "../Controller/UserController.js";

const router = Router();

router
  .get("/", fetchUsers)
  .post("/", createUser)
  .put("/:id", updateUser)
  .delete("/:id", deleteUser)
  .get("/:id", showUser);

export default router;
