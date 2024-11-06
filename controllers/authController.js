const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { generateToken } = require("../utils/generateToken");

const userModel = require("../models/user-model.js");

module.exports.registerUser = (req, res) => {
  try {
    let { email, fullname, password } = req.body;

    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(password, salt, async (err, hash) => {
        if (err) return res.send(err.message);
        else {
          let user = await userModel.findOne({ email });
          if (user) {
            res.status(409).send("user already exist");
          } else {
            let user = await userModel.create({
              email,
              fullname,
              password: hash,
            });
            let token = generateToken(user);
            res.cookie("token", token);
            res.send("usercreated successfully");
          }
        }
      });
    });
  } catch (err) {
    res.send(err.message);
    res.status(500).send("server error");
  }
};

module.exports.loginUser = async (req, res) => {
  let { email, password } = req.body;

  let user = await userModel.findOne({ email });
  if (!user) return res.send("email or password incorccrect");
  bcrypt.compare(password, user.password, (err, result) => {
    if (result) {
      let token = generateToken(user);
      res.cookie("token", token);
      res.redirect("/shop");
    } else {
      res.send("email or password incorccrect");
    }
  });
};

module.exports.logout = (req, res) => {
  res.cookie("token", "");
  res.redirect("/");
  
};
