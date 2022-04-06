import User from "../models/User.js";
import { StatusCodes } from "http-status-codes";
import { BadRequestError, UnAuthenticatedError } from "../errors/index.js";
import _ from "lodash";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

// set up nodemailer
const contactEmail = nodemailer.createTransport({
  host: process.env.HOST,
  port: "465",
  secureConnection: "true", //true or false
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASS,
  },
});

contactEmail.verify((error) => {
  if (error) {
  } else {
  }
});

export const register = async (req, res) => {
  const { email, name, password } = req.body;
  const emailLC = _.toLower(email);

  if (!name || !email || !password) {
    throw new BadRequestError("please provide all values");
  }

  const userAlreadyExists = await User.findOne({ email });
  if (userAlreadyExists) {
    throw new BadRequestError("email already in use");
  }

  const user = await User.create({ email: emailLC, name, password });
  const token = user.createJWT();
  res.status(StatusCodes.CREATED).json({
    user: {
      name: user.name,
      email: user.email,
    },
    token,
  });
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    throw new UnAuthenticatedError("email not found");
  }

  const isPasswordCorrect = await user.comparePassword(password);

  if (!isPasswordCorrect) {
    throw new UnAuthenticatedError("wrong password");
  }

  const token = user.createJWT();
  res.status(StatusCodes.CREATED).json({
    user: {
      name: user.name,
      email: user.email,
    },
    token,
  });
};

export const updateUser = async (req, res) => {
  const { name, email } = req.body;

  const emailLC = _.toLower(email);
  const user = await User.findById(req.user.userId);

  if (user.email != email) {
    const emailCheck = await User.findOne({ email: emailLC });
    if (emailCheck) {
      throw new BadRequestError("email already in use");
    }
  }

  user.name = name;
  user.email = emailLC;
  await user.save();

  const token = user.createJWT();

  res.status(StatusCodes.CREATED).json({
    user,
    token,
  });
};

export const resetPassword = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email: email });

  if (!user) {
    throw new UnAuthenticatedError("email not found");
  }

  const token = user.createJWTReset();

  const mailToClient = {
    from: "christian.grothe@posteo.de",
    to: email,
    subject: `reset password`,
    html: `<p>Follow this link to reset your password</p>
            <a href='https://tranquil-crag-63984.herokuapp.com/reset-password/${token}'>reset</a>`,
  };

  await contactEmail.sendMail(mailToClient);

  res.status(StatusCodes.OK).json({ msg: "please check your mails" });
};

export const updatePassword = async (req, res) => {
  const { password } = req.body;
  const user = await User.findById(req.user.userId);
  user.password = password;
  user.save();
  res.status(StatusCodes.OK).json({ msg: "password updated" });
};
