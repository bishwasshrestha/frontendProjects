// config/passport.js
import { Strategy as LocalStrategy } from "passport-local";
import User from '../models/Users.js';
import passport from 'passport';

export default function (passport) {
  passport.use(
    "local",
    new LocalStrategy(async (username, password, done) => {
      try {
        //looking for user
        const user = await User.findOne({ username });
        if (!user) {
          console.log("user not found!");
          return false;
        }
        //checking for valid password
        const isMatch = await user.isValidPassword(password);
        if (!isMatch) {
          console.log("password did not match!");
          return false;
        }
        return done(null, user);
      } catch (err) {
        return done(err);
      }
    })
  );

  passport.serializeUser((User, done) => done(null, User.id));
  passport.deserializeUser(async (id, done) => {
    const user = await User.findById(id);
    done(null, user);
  });
}
