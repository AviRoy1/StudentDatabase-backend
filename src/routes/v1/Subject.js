import express from "express";
import { addSubject, getAllSubject } from "../../controller/Subject.js";

const router = express.Router();

router.post("/add", addSubject);
router.get("/all", getAllSubject);

export default router;
