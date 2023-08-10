import express from "express";
import user from "./v1/Auth.js";
import subject from "./v1/Subject.js";
import attendance from "./v1/Attendance.js";

const router = express.Router();

router.use("/user", user);
router.use("/subject", subject);
router.use("/attendance", attendance);

export default router;
