const passport = require("passport");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const LocalStrategy = require("passport-local");
const User = require("../models/User");
const config = require("../config/key");

// SetUp options of local Strategy
const localOptions = { usernameField: "email" };

// create local strategy
const localLogin = new LocalStrategy(localOptions, function(
  email,
  password,
  done
) {
  // veryfy email/ password and call done if correct
  User.findOne({ email }, function(err, user) {
    if (err) return done(err);
    if (!user) return done(null, false);

    // Compare Passsowrds from request and db password
    user.comparePassword(password, function(err, isMatch) {
      if (err) return done(err);
      // call done with false
      if (!isMatch) return done(null, false);

      return done(null, user);
    });
  });
});

// SetUp options of JWT Strategy
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader("authorization"),
  secretOrKey: config.secret
};

// Create JWT strategy
const jwtLogin = new JwtStrategy(jwtOptions, function(payload, done) {
  // Check if User Id in payload exist in db
  User.findById(payload.sub, function(err, user) {
    if (err) return done(err, false);
    // return user object
    if (user) return done(null, user);
    // done checking
    done(null, false);
  });
});

// Use User created Strategy
passport.use(jwtLogin);
passport.use(localLogin);
