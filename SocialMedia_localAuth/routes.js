const passport = require("passport");
const bcrypt = require("bcrypt");

module.exports = function (app, myDataBase) {
  function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) return next();
    res.redirect("/");
  }

  //home page
  app.route("/").get((req, res) => {
    res.render("index", {
      title: "Connected to Database",
      message: req.body.message,
      showLogin: true,
      showRegistration: true,
      showSocialAuth: true,
    });
  });

  //authenticate the user and then loging in
  app.route("/login").post(
    passport.authenticate("local", {
      failureRedirect: "/",
      failureMessage: true,
    }),
    (req, res) => {
      res.redirect("/profile");
    }
  );

  //Registration of user
  app.route("/register").post((req, res, next) => {
    const hash = bcrypt.hashSync(req.body.password, 12);
    myDataBase.findOne(
      { username: req.body.username },
      (err, user) => {
        if (err) {
          console.log("error after db query");
          next(err);
        } else if (user) {
          console.log("user found", user, "try loging in!");
          res.redirect("/");
        } else {
          myDataBase.insertOne(
            {
              username: req.body.username,
              password: hash,
            },
            (err, doc) => {
              if (err) {
                console.log("error inserting user");
                res.redirect("/");
              } else {
                // console.log("user registration successful", doc.ops[0]);
                // next(null, doc.ops[0]);
                req.login(doc.ops[0], (errr) => {
                  if (err) return next(err);
                  return res.redirect("/profile");
                });
              }
            }
          );
        }
      },
      passport.authenticate("local", {
        failureRedirect: "/",
        failureMessage: true,
      }),
      (req, res, next) => {
        console.log("redirecting to profile");
        res.redirect("/profile");
      }
    );
  });
  //github authentication
  app.route("/auth/github").get(passport.authenticate("github"));
  app
    .route("/auth/github/callback")
    .get(
      passport.authenticate("github", { failureRedirect: "/" }),
      (req, res) => {
        req.session.user_id = req.user.id;
        res.redirect("/chat");
      }
    );
  //logout
  app.route("/logout").get((req, res) => {
    req.logout();
    res.redirect("/");
  });
  //profile page
  app.route("/profile").get(ensureAuthenticated, (req, res) => {
    res.render("profile", { username: req.user.username });
  });

  //chat page
  app.route("/chat").get(ensureAuthenticated, (req, res) => {
    res.render("chat", { user: req.user });
  });

  app.use((req, res, next) => {
    res.status(404).type("text").send("404 Error! Page Not Found");
  });
};
