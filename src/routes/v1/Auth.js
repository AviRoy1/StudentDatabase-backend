import express from "express";
import {
  addStudent,
  getallStudents,
  login,
  myProfile,
} from "../../controller/Auth.js";
import verifytoken from "../../middleware/verifyToken.js";

const router = express.Router();

router.post("/addStudent", addStudent);
router.post("/login", login);
router.post("/alluser", getallStudents);
router.post("/me", verifytoken, myProfile);

export default router;
