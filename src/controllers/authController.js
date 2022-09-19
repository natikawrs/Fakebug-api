const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// const AppError = require("../utils/appError");
// const { User } = require("../models");

// const genToken = (payload) =>
//   jwt.sign(payload, process.env.JWT_SECRET_KEY || "private_key", {
//     expiresIn: process.env.JWT_EXPIRES || "7d"
//   });

// exports.register = async (req, res, next) => {
//   try {
//     const { firstName, lastName, emailorMobile, password, confirmPassword } =
//       req.body;

//     if (!emailorMobile) {
//       //   res.status(400).json({ message: "email or mobile is required" });
//       throw new AppError("email or mobile is required", 400);
//     }
//     if (!password) {
//       throw new AppError("password is required", 400);
//     }

//     if (password !== confirmPassword) {
//       throw new AppError("password and confirmPassword did not match", 400);
//     }

//     const isEmail = validator.isEmail(emailorMobile + "");
//     const isMobile = validator.isMobilePhone(emailorMobile + "");

//     if (!isEmail && isMobile) {
//       throw new AppError("email address or mobile is invalid format", 400);
//     }

//     const hashedPassword = await bcrypt.hash(password, 12);
//     const user = await User.create({
//       firstName,
//       lastName,
//       email: isEmail ? emailorMobile : null,
//       mobile: isMobile ? emailorMobile : null,
//       password: hashedPassword
//     });

//     const token = genToken({ id: user.id });
//     res.status(201).json({ token });
//   } catch (err) {
//     next(err);
//   }
// };

const AppError = require("../utils/appError");
const { User } = require("../models");

const genToken = (payload) =>
  jwt.sign(payload, process.env.JWT_SECRET_KEY || "private_key", {
    expiresIn: process.env.JWT_EXPIRES || "1d"
  });

exports.register = async (req, res, next) => {
  try {
    const { firstName, lastName, emailOrMobile, password, confirmPassword } =
      req.body;

    if (!emailOrMobile) {
      throw new AppError("email or mobile is required", 400);
      // res.status(400).json({message: 'email or mobile is required'}) เราไปสร้าง file appError แล้ว
    }

    if (!password) {
      throw new AppError("password is required", 400);
    }

    if (password !== confirmPassword) {
      throw new AppError("password and confirm password did not match", 400);
    }

    const isEmail = validator.isEmail(emailOrMobile + "");
    const isMobile = validator.isMobilePhone(emailOrMobile + "");

    if (!isEmail && !isMobile) {
      throw new AppError("email address and mobile is invalid format", 400);
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const user = await User.create({
      firstName,
      lastName,
      email: isEmail ? emailOrMobile : null,
      mobile: isMobile ? emailOrMobile : null,
      password: hashedPassword
    });

    const token = genToken({ id: user.id });
    res.status(201).json({ token });
  } catch (err) {
    next(err);
  }
};
