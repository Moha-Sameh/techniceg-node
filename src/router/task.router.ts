import express from "express";
import passport from "passport";
import { createTask, findTask, getTasks } from "../controller/task.controller";
const router = express.Router();

// Param
router.param("id", async (req, res, next, id) => {
  const task = await findTask(id, next);
  if (task) {
    // req.task = task;
    next();
  } else {
    res.status(404);
    throw new Error("Task not found");
  }
  next();
});

router.get("/tasks", getTasks);
router.post(
  "/tasks",
  passport.authenticate("jwt", { session: false }),
  createTask
);

export default router;
