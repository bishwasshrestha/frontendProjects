import express from "express";
import mongoose from "mongoose";
import session from "express-session";
import passport from "passport";
import flash from "connect-flash";
import { create } from "express-handlebars";
import usersRoute from "./routes/users.js";
import homeRoute from "./routes/home.js";
import ensureAuth from "./middleware/auth.js";

const hbs = create({});
import passportConfig from "./config/passport.js";
passportConfig?.(passport);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static("views"));

//mongodb connect
mongoose.connect("mongodb://127.0.0.1:27017/auth_demo");

//Middleware
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: "my_secret",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

//View Engine setup

app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

// //Routes
app.use("/users", usersRoute);
app.use("/home", homeRoute);

app.listen(PORT, console.log(`Server running on port ${PORT}`));
