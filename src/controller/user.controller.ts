import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import db from "../db/models";
import bcrypt from "bcryptjs";

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
      exp: Date.now() + parseInt(process.env.JWT_EXPIRATION_MS as string, 16),
    };
    const token = jwt.sign(
      JSON.stringify(payload),
      process.env.JWT_EXPIRATION_MS as string
    );
    res.status(201).json({ token });
  } catch (error) {
    next(error);
  }
};

export const userLogin = (req: Request, res: Response, next: NextFunction) => {
  try {
    const { user } = req;
    if (user == null) {
      res.send("Invalid user data");
      return;
    }
    const payload = {
      id: user.id,
      username: user.username,
      role: user.role,
      exp: Date.now() + parseInt(process.env.JWT_EXPIRATION_MS as string, 16),
    };
    const token = jwt.sign(
      JSON.stringify(payload),
      process.env.JWT_SECRET as string
    );
    res.json({ token });
  } catch (error) {
    next(error);
  }
};
