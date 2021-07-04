import { NextFunction, Request, Response } from "express";
import db from "../db/models";

// Find Task by ID
export const findTask = async (id: number, next: NextFunction) => {
  try {
    const task = await db.Task.findByPk(id);
    return task;
  } catch (error) {
    next(error);
  }
};

// Create new task
export const createTask = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { title, description, status, price } = req?.body;
    if (
      !title ||
      !description ||
      !status ||
      !price ||
      typeof title !== "string" ||
      typeof description !== "string" ||
      typeof status !== "string" ||
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
    req.body.status = "Pending";
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
