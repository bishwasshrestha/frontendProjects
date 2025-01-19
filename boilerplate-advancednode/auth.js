const LocalStrategy = require("passport-local");
const passport = require("passport");
const bcrypt = require("bcrypt");
const { ObjectId } = require("mongodb");
const { compileClientWithDependenciesTracked } = require("pug");
const { emit } = require("nodemon");

const GitHubStrategy = require("passport-github").Strategy;
require("dotenv").config();

module.exports = function (app, myDataBase) {
  

  //serializating user id
  passport.serializeUser((user, done) => {
    done(null, user._id);
  });

  //deserializing user id
  passport.deserializeUser((id, done) => {
    myDataBase.findOne({ _id: new ObjectId(id) }, (err, doc) => {
      done(null, doc);
    });
  });

  //Authentication Strategies

  //github strategy
  passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: "/auth/github/callback",
  },(accessToken, refereshToken, profile, cb)=>{
 
    myDataBase.findOneAndUpdate(
      { id: profile.id },
      {
        $setOnInsert:{
          id: profile.id,
          username: profile.username,
          name: profile.displayName,
          photo: profile.photos[0].value || '',
          email: Array.isArray(profile.emails) ? profile.emails[0].value : 'No public email',
          created_on: new Date(),
          provider: profile.provider || ''
        },
        $set:{
          last_login: new Date()
        },
        $inc:{
          login_count: 1
        }
      },
      {
        upsert: true,
        new:true
      },(err, doc)=>{       
        return cb(null, doc.value);
      }
    )
  }));

  //local strategy
  passport.use(
    new LocalStrategy(
      {
        clientID: process.env.clientID,
        clientSecret: process.env.clientSecret,
        callbackURL: "http://localhost:8080",
      },
      (username, password, done) => {
        console.log("authenticating user");
        myDataBase.findOne({ username: username }, (err, user) => {
          if (err) return done(err);
          if (!user) return done(null, false);
          // if (password !== user.password) return done(null, false);
          if (!bcrypt.compareSync(password, user.password)) {
            console.log(
              "username or password did not match, plesae try again."
            );
            return done(null, false);
          }
          return done(null, user);
        });
      }
    )
  );
};
