const studentSchema = require("../../models/schema");
const passport = require("passport");
const JwtStrategy = require("passport-jwt").Strategy,
  ExtractJwt = require("passport-jwt").ExtractJwt;
require("dotenv").config();

var opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.TOKEN_SECRET_KEY;
passport.use(
  new JwtStrategy(opts, function (jwt_payload, done) {
    studentSchema
      .findOne({ email: jwt_payload.email })
      .then(function (user, err) {
        if (err) {
          console.log("auth1");
          return done(err, false);
        }
        if (user) {
          console.log("auth2");
          return done(null, user);
        } else {
          console.log("auth3");
          return done(null, false);
          // or you could create a new account
        }
      });
  })
);
