const User = require("../models/users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userService = require("../services/user.service");
const userRepository = require("../repositories/user.repository");

exports.registerUser = async (req, res, next) => {
  try {
    await userService.registerUser(req.body);
    res.json({
      status: 200,
      message: "user registered successfully!!!",
    });
  } catch (err) {
    next(err);
  }
};

exports.registerAdmin = async (req, res, next) => {
  try {
    await userService.registerAdmin(req.body);
    res.json({
      status: 200,
      message: "Admin registered successfully!!!",
    });
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    await userService.login(req, res, next);
  } catch (err) {
    next(err);
  }
};

exports.refresh = async (req, res) => {
  try {
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(401);
    const refreshToken = cookies.jwt;

    // const foundUser = await User.findOne({ refreshToken }).exec();
    const foundUser = await userRepository.getUserByRefreshToken(refreshToken);
    if (!foundUser) return res.sendStatus(403); //Forbidden
    // evaluate jwt
    jwt.verify(refreshToken, "thesecrettoken", (err, decoded) => {
      if (err || foundUser.uuid.toString() !== decoded.uuid)
        return res.sendStatus(403);
      // const roles = Object.values(foundUser.roles);
      let token = jwt.sign({ uuid: decoded.uuid }, "thesecrettoken", {
        expiresIn: "30min",
      });
      res.json({
        token: token,
        user: foundUser,
      });
    });
  } catch (err) {
    console.log(err);
  }
};

exports.logout = async (req, res, next) => {
  try {
    await userService.logout(req, res, next);
  } catch (err) {
    next(err);
  }
};
