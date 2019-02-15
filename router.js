const passport = require("passport");
const Authentication = require("./controllers/authentication");
const passportService = require("./services/passport");

const requireAuth = passport.authenticate("jwt", { session: false });
const requireSignin = passport.authenticate("local", { session: false });

module.exports = app => {
  app.get("/", requireAuth, function(req, res) {
    res.send("You are authenticated");
  });
  app.post("/auth/signin", requireSignin, Authentication.signin);
  app.post("/auth/signup", Authentication.signup);
};
