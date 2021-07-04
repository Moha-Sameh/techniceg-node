import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import session from "express-session";
import passport from "passport";
import db from "./db/models";
import errorMiddleware from "./middleware/error.middleware";
import { jwtStrategy, localStrategy } from "./middleware/passport.middleware";
import Task from "./router/task.router";
import User from "./router/user.router";

dotenv.config();

const port = process.env.PORT || 4000;
// Middleware
const app = express();
app.use(express.json());
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(
  session({
    secret: "secretcode",
    resave: true,
    saveUninitialized: true,
  })
);
app.use(errorMiddleware);
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());
passport.use(jwtStrategy);
passport.use(localStrategy);

// Routes
app.use("/", User);
app.use("/", Task);

// App Start
const run = async () => {
  try {
    await db.sequelize.sync();
  } catch (error) {
    throw new Error("Error connecting to the database");
  }
  app.listen(port);
};

run();
