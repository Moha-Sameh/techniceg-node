import express from "express";
import cors from "cors";
import passport from "passport";
import cookieParser from "cookie-parser";
import session from "express-session";
import dotenv from "dotenv";
import db from "./db/models";
import errorMiddleware from "./middleware/error.middleware";
import localStrategy from "./middleware/passport.middleware";
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
passport.use(localStrategy);

//Routes
app.use("/", User);

//App Start
const run = async () => {
  try {
    await db.sequelize.sync();
  } catch (error) {
    console.error("Error connecting to the database: ", error);
  }
  app.listen(port);
};

run();
