import mongoose from "mongoose";
const attendanceSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      require: true,
    },
    date: {
      type: String,
      require: true,
    },
    subjects: [
      {
        type: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);
const Attendance = mongoose.model("Attendance", attendanceSchema);
export default Attendance;
