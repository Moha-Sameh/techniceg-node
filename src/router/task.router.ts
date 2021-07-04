import express from "express";
import passport from "passport";
import {
  createTask,
  getTasks,
  updateTask,
} from "../controller/task.controller";
const router = express.Router();

router.get("/tasks", getTasks);
router.post(
  "/tasks",
  passport.authenticate("jwt", { session: false }),
  createTask
);
router.put(
  "/tasks",
  passport.authenticate("jwt", { session: false }),
  updateTask
);

export default router;
