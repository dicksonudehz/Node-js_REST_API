import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import randomstring from "randomstring";
import generateToken from "../utils/generateToken.js";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "your-smtp-host",
  port: 587,
  secure: false,
  auth: {
    user: "your-email@example.com",
    pass: "your-email-password",
  },
});

const sendMail = async (req, res) => {
  try {
    const { to, subject, text } = req.body;

    const mailOptions = {
      from: "your-email@example.com",
      to,
      subject,
      text,
    };

    await transporter.sendMail(mailOptions);
    res.json({ message: "Email sent successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to send email" });
  }
};

const register = async (req, res) => {
  const { name, email, password, address } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }
  const user = await User.create({
    name,
    email,
    password,
    address,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      address: user.address,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
};

// get a single user
const getAUser = async (req, res) => {
  const userId = req.query.userId;
  try {
    const user = await User.findById(userId);
    if (user) {
      res.json({ message: "user found", singleUser });
    } else {
      res.status(400).json({ Message: "User cannot be found" });
    }
  } catch (error) {
    throw new Error(error);
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (user) {
      const isMatch = bcrypt.compareSync(password, user.password);
      if (isMatch) {
        const token = generateToken(user._id);
        res.json({ message: "login successful", token, user, status: true });
      } else {
        res.status(400).json({ message: "unable to login", status: false });
      }
    } else {
      res.status(400).json({ message: "user not find", status: false });
    }
  } catch (err) {
    throw new Error(err);
  }
};

//forget password
const forgetPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email: email });
    if (user) {
      const otp2 = randomstring.generate({
        length: 6,
        charset: "numeric",
      });
      // user.otp = otp;
      await User.findByIdAndUpdate(
        user._id,
        { otp: otp2 },
        { new: true, useFindAndModify: false }
      );
      res.json({ message: "otp sent to your mail", otp2, user });
    } else {
      res.status(400).json({ message: "Sorry, user doesn't exist" });
    }
  } catch (err) {
    throw new Error(err);
  }
};

const changePassword = async (req, res) => {
  try {
    const { otp, password } = req.body;
    const user = await User.findOne({ otp: otp });
    if (user) {
      const otp2 = randomstring.generate({
        length: 6,
        charset: "numeric",
      });
      const newPass = await bcrypt.hash(password, 10);
      const updatePass = await User.findByIdAndUpdate(
        user._id,
        { password: newPass, otp: otp2 },
        { new: true, useFindAndModify: false }
      );

      if (updatePass) {
        res.json({ message: "password Updated Successfully" });
      } else {
        res.json({ message: "unable to update password" });
      }
    } else {
      res.json({ message: "user not found" });
    }
  } catch (err) {
    throw new Error(err);
  }
};

//logout

const logOut = async (req, res) => {
  try {
    req.header.authorization = null;

    res.json({ message: " logout successful" });
  } catch (err) {
    throw new Error(err);
  }
};

export {
  register,
  login,
  forgetPassword,
  changePassword,
  logOut,
  sendMail,
  getAUser,
};
