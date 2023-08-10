import express from "express";
import Student from "../model/Student.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const JWTSEC = "7393$##fwfwk31323";

export const addStudent = async (req, res) => {
  try {
    const oldusername = await Student.findOne({ username: req.body.username });
    if (oldusername) {
      return res.status(401).json({
        message: "This username is already exist. Please add a new UserName",
      });
    }
    const salt = await bcrypt.genSalt(10);
    const encyptPass = await bcrypt.hash(req.body.password, salt);
    const newstudent = await Student.create({
      name: req.body.name,
      password: encyptPass,
      age: req.body.age,
      Class: req.body.Class,
      username: req.body.username,
      subjects: req.body.subjects,
    });
    const all = await Student.find().sort({ createdAt: -1 });
    return res
      .status(200)
      .json({ message: "Successfully created new user", user: all });
  } catch (error) {
    console.log(err);
    return res.status(400).json({ message: err, error: true });
  }
};

export const login = async (req, res) => {
  try {
    const user = await Student.findOne({ username: req.body.username });
    if (!user) {
      return res.status(400).json({ message: "Invalid Username or Password" });
    }
    const comparePassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!comparePassword) {
      return res.status(400).json({ message: "Invalid Username or Password" });
    }
    const accessToken = jwt.sign(
      {
        id: user._id,
        email: user.email,
      },
      JWTSEC
    );
    return res
      .status(200)
      .json({ user: user, accessToken: accessToken, isStudent: true });
  } catch (error) {
    console.log(err);
    return res.status(400).json({ message: err, error: true, isStudent: true });
  }
};

export const getallStudents = async (req, res) => {
  try {
    let all;
    if (
      req?.body?.Class === undefined ||
      req?.body?.Class === null ||
      req?.body?.Class === ""
    ) {
      all = await Student.find().sort({
        createdAt: -1,
      });
    } else {
      all = await Student.find({ Class: req?.body?.Class }).sort({
        createdAt: -1,
      });
    }
    return res.status(200).json({ user: all });
  } catch (error) {
    console.log(err);
    return res.status(400).json({ message: err, error: true });
  }
};

export const myProfile = async (req, res) => {
  try {
    console.log(req.user);
    const me = await Student.findById(req.user._id);
    return res.status(200).json({ user: me });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: error, error: true });
  }
};
