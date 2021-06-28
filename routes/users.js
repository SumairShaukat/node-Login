const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Keys = require("../config/Keys");
const User = require("../model/user");
 const passport = require("passport");

//register user

router.post("/register", (req, res) => {
  User.findOne({ email: req.body.email }).then((user) => {
    if (user) {
      res.status(400).json({ email: "user already exist" });
    } else {
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
      });
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then((user) => res.json(user))
            .catch((err) => console.log(err));
        });
      });
    }
  });
});

//login User

router.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  User.findOne({ email }).then((user) => {
    if (!user) {
      res.status(404).json({ email: "User not found" });
    } else {
      bcrypt.compare(password, user.password).then((isMatch) => {
        if (isMatch) {
          const payload = { id: user.id, name: user.name };

          jwt.sign(
            payload,
            Keys.secretOrKey,
            { expiresIn: 3600 },
            (err, token) => {
              res.json({
                success: true,
                token: "Bearer" + token,
              });
            }
          );
        } else {
          return res.status(400).json({ message: "Password incorrect" });
        }
      });
    }
  });
});



router.get('/current', passport.authenticate('jwt', {session: true}), (req, res)=>{
  
  res.json({
    id: req.body.id,
    name: req.body.name,
    emai: req.body.email
  })
})

module.exports = router;
