import express from "express";
import {
  addAttendance,
  myAttendance,
  pendingAttendance,
} from "../../controller/Attendance.js";
import verifytoken from "../../middleware/verifyToken.js";

const router = express.Router();

router.post("/add", addAttendance);
router.post("/get", pendingAttendance);
router.post("/myattendance", verifytoken, myAttendance);

export default router;
