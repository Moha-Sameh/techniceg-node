import passportLocal from "passport-local";
import passportJwt from "passport-jwt";
import bcrypt from "bcryptjs";
import db from "../db/models";

const LocalStrategy = passportLocal.Strategy;
const JWTStrategy = passportJwt.Strategy;

// localStrategy Passport
export const localStrategy = new LocalStrategy(
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

// JWT Strategy
export const jwtStrategy = new JWTStrategy(
  {
    jwtFromRequest: passportJwt.ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET,
  },
  async (jwtPayload, done) => {
    if (Date.now() > jwtPayload.exp) return done(null, false);
    try {
      const user = await db.User.findByPk(jwtPayload.id);
      done(null, user);
    } catch (error) {
      done(error);
    }
  }
);
