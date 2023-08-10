import mongoose from "mongoose";
const SubjectSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);
const Subject = mongoose.model("Subject", SubjectSchema);
export default Subject;
