import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";

import User from "../models/user.model.js";
import { createHash, isValidPassword } from "../utils/bcrypt.js";

const initializePassport = () => {
  passport.use(
    "register",
    new LocalStrategy(
      { passReqToCallback: true, usernameField: "email" },
      async (req, username, password, done) => {
        try {
          const { first_name, last_name, age } = req.body;

          const exists = await User.findOne({ email: username });
          if (exists) {
            return done(null, false, { message: "El correo ya está en uso" });
          }

          const newUser = await User.create({
            first_name,
            last_name,
            age,
            email: username,
            password: createHash(password),
          });

          return done(null, newUser);
        } catch (error) {
          return done(error);
        }
      },
    ),
  );

  passport.use(
    "login",
    new LocalStrategy(
      { usernameField: "email" },
      async (username, password, done) => {
        try {
          const user = await User.findOne({ email: username });
          if (!user) return done(null, false);

          if (!isValidPassword(user, password)) return done(null, false);

          return done(null, user);
        } catch (error) {
          return done(error);
        }
      },
    ),
  );

  passport.use(
    "jwt",
    new JwtStrategy(
      {
        jwtFromRequest: ExtractJwt.fromExtractors([
          (req) => req?.cookies?.token,
        ]),
        secretOrKey: process.env.JWT_SECRET,
      },
      async (payload, done) => {
        try {
          return done(null, payload.user);
        } catch (error) {
          return done(error);
        }
      },
    ),
  );
};

export default initializePassport;
