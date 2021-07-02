import passportLocal from "passport-local";
import bcrypt from "bcryptjs";
import db from "../db/models";

const LocalStrategy = passportLocal.Strategy;

// Passport

const localStrategy = new LocalStrategy(
  async (username: string, password: string, done) => {
    try {
      const user = await db.User.findOne({
        where: { username },
      });
      const passwordMatch = user
        ? await bcrypt.compare(password, user.password)
        : false;
      passwordMatch
        ? done(null, user)
        : done(null, false, { message: "Incorrect password" });
    } catch (error) {
      done(error);
    }
  }
);

export default localStrategy;
