import { NextFunction, Request, Response } from "express";
import jwt, { decode } from "jsonwebtoken";
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
      // tslint:disable-next-line: radix
      exp: Date.now() + parseInt(process.env.JWT_EXPIRATION_MS as string),
    };
    const refreshPayload = {
      id: user.id,
      username: user.username,
      role: user.role,

      exp:
        // tslint:disable-next-line: radix
        Date.now() + parseInt(process.env.JWT_REFRESH_EXPIRATION_MS as string),
    };
    const token = jwt.sign(
      JSON.stringify(payload),
      process.env.JWT_SECRET as string
    );
    // tslint:disable-next-line: no-shadowed-variable
    const refreshToken = jwt.sign(
      JSON.stringify(refreshPayload),
      process.env.JWT_REFRESH_SECRET as string
    );
    res.json({ token, refreshToken });
  } catch (error) {
    next(error);
  }
};

export const refreshToken = (req: Request, res: Response): void => {
  const myToken = decode(req.body.token);
  const myRefreshToken = decode(req.body.refreshToken);
  try {
    if (myRefreshToken == null || myToken == null) {
      res.send("Invalid Token not found");
      return;
    }
    // @ts-ignore
    if (myToken.id === myRefreshToken.id) {
      const newPayLoad = {
        // @ts-ignore
        id: myToken.id,
        // @ts-ignore
        username: myToken.username,
        // @ts-ignore
        role: myToken.role,
        // tslint:disable-next-line: radix
        exp: Date.now() + parseInt(process.env.JWT_EXPIRATION_MS as string),
      };
      // @ts-ignore
      const newRefreshPayLoad = {
        // @ts-ignore
        id: myRefreshToken.id,
        // @ts-ignore
        username: myRefreshToken.username,
        // @ts-ignore
        role: myRefreshToken.role,
        exp:
          Date.now() +
          // tslint:disable-next-line: radix
          parseInt(process.env.JWT_REFRESH_EXPIRATION_MS as string),
      };
      const newtoken = jwt.sign(
        JSON.stringify(newPayLoad),
        process.env.JWT_SECRET as string
      );
      const newrefreshToken = jwt.sign(
        JSON.stringify(newRefreshPayLoad),
        process.env.JWT_REFRESH_SECRET as string
      );
      res.json({ newtoken, newrefreshToken });
    }
  } catch (error) {
    throw new Error("Invalid");
  }
};
