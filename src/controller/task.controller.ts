import { NextFunction, Request, Response } from "express";
import db from "../db/models";

// Create new task
export const createTask = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { title, description, price } = req?.body;
    if (
      !title ||
      !description ||
      !price ||
      typeof title !== "string" ||
      typeof description !== "string" ||
      typeof price !== "number"
    ) {
      res.send("Improper Values");
      return;
    }
    if (req.user == null) {
      res.send("Must be Authenticated");
      return;
    }
    req.body.creatorId = req.user.id;
    req.body.status = "Todo";
    const newTask = await db.Task.create(req.body);
    res.json(newTask);
  } catch (error) {
    next(error);
  }
};

// Get all tasks
export const getTasks = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const tasks = await db.Task.findAll();
    res.json(tasks);
  } catch (error) {
    next(error);
  }
};

// Update Task by ID
export const updateTask = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const task = await db.Task.findByPk(req.body.id);
    await task.update({ ...req.body });
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};
