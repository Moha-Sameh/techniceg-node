import express from "express";
import passport from "passport";
import { userRegister, userLogin } from "../controller/user.controller";
const router = express.Router();

// Routes
router.post("/register", userRegister);
router.post(
  "/login",
  passport.authenticate("local", { session: false }),
  userLogin
);

export default router;
