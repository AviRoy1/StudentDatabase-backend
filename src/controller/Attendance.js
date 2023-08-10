import mongoose from "mongoose";
import Attendance from "../model/Attendance.js";
import Subject from "../model/Subjects.js";
import Student from "../model/Student.js";

export const addAttendance = async (req, res) => {
  try {
    const dateString = req.body.date;
    const attendanceDate = dateString.substring(0, 10);

    let attendance = await Attendance.findOne({
      student: req.body.studentId,
      date: attendanceDate,
    });

    if (!attendance) {
      attendance = await Attendance.create({
        student: req.body.studentId,
        date: attendanceDate,
        subjects: req.body.subjects,
      });
    } else {
      attendance.subjects = req.body.subjects;
      await attendance.save();
    }

    return res.status(200).json({ message: "Attendance" });
  } catch (error) {
    return res.status(400).json({ message: "Some error occurs" });
  }
};

export const pendingAttendance = async (req, res) => {
  try {
    const { date, Class } = req.body;
    const condition = {
      subjects: { $exists: true, $ne: [] },
      _id: {
        $nin: await Attendance.distinct("student", { date: new Date(date) }),
      },
    };

    if (Class) {
      condition.Class = Class;
    }
    const studentWithPendingAtten = await Student.find(condition).select(
      "name Class subjects"
    );
    return res.status(200).json({ user: studentWithPendingAtten });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: "Some error occurs" });
  }
};

export const myAttendance = async (req, res) => {
  try {
    const dateString = req.body.date;
    const attendanceDate = dateString.substring(0, 10);
    const me = await Student.findById(req.user.id);
    const attendance = await Attendance.findOne({
      date: attendanceDate,
      student: req.user.id,
    });
    let allsub = me.subjects;
    let attended = attendance === null ? [] : attendance.subjects;

    let absent;
    if (attended.length === 0) absent = allsub;
    else absent = allsub.filter((sub) => !attended.includes(sub));
    return res.status(200).json({ attended: attended, absent: absent });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: "Some error occurs" });
  }
};
