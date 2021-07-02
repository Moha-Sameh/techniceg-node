import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import db from "../db/models";
import bcrypt from "bcryptjs";

export const findUser = async (id: string, next: NextFunction) => {
  try {
    const user = await db.User.findByPk(id);
    return user;
  } catch (error) {
    next(error);
  }
};

export const userRegister = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { username, password, name, role } = req?.body;
    if (
      !username ||
      !password ||
      !name ||
      !role ||
      typeof username !== "string" ||
      typeof password !== "string" ||
      typeof name !== "string" ||
      typeof role !== "string"
    ) {
      res.send("Improper Values");
      return;
    }
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    req.body.password = hashedPassword;
    const newUser = await db.User.create(req.body);
    const payload = {
      id: newUser.id,
      name: newUser.name,
      username: newUser.username,
      role: newUser.role,
    };
    const token = jwt.sign(JSON.stringify(payload), "my_quick_cast_live@1");
    res.status(201).json({ token });
  } catch (error) {
    next(error);
  }
};

export const userLogin = (req: Request, res: Response) => {
  res.send("Successfully Authenticated");
};
