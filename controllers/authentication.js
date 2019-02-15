const jwt = require("jwt-simple");
const config = require("../config/key");
const User = require("../models/User");

function tokenForuser(user) {
  const timestamp = new Date().getTime();
  return jwt.encode({ sub: user.id, iat: timestamp }, config.secret);
}

exports.signin = function(req, res, next) {
  // User already has email and passord authenticated
  // send token
  res.json({ token: tokenForuser(req.user) });
};

exports.signup = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  if (!email || !password)
    return res
      .status(422)
      .send({ error: "You must provide email and passoword" });
  // Check if user exist
  User.findOne({ email }, (err, existingUser) => {
    if (err) return next(err);

    // if email exists return error
    if (existingUser) {
      return res.status(422).send({ error: "Email is in use" });
    }

    // if email doesnot exist, create and save user
    const user = new User({
      email,
      password
    });

    user.save(err => {
      if (err) return next(err);

      // Resopond to requiest to indicate user created.
      res.json({ token: tokenForuser(user) });
    });
  });
};
