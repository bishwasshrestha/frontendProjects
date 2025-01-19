// routes/users.js
import { Router } from "express";
import passport from "passport";
import User from "../models/Users.js";
const router = Router();

// Register route
router.get("/register", (req, res) =>
  res.render("register", { layout: false })
);
router.post("/register", async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = new User({ username, password });
    const result = await user.save();
    // console.log("result:", result);
    res.redirect("/users/login");
  } catch (err) {
    console.log(err);
  }
});

// Login route
router.get("/login", (req, res) => {
  res.render("login", { layout: false });
});

router.post("/login", (req, res, next) => {
  passport.authenticate("local", {
    successRedirect: "/home",
    failureRedirect: "/users/login",
    failureFlash: true,
  })(req, res, next);
});

// Logout route
router.get("/logout", (req, res) => {
  req.logout(() => {
    req.flash("success_msg", "You are logged out");
    res.redirect("/users/login");
  });
});

export default router;
