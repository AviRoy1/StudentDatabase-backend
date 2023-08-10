import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import crypto from "crypto";
const StudentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    password: {
      type: String,
    },
    username: {
      type: String,
      unique: true,
    },
    age: {
      type: String,
    },
    Class: {
      type: String,
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

StudentSchema.methods.getJWTToken = function () {
  return jwt.sign({ _id: this._id }, "kfqifqfn217184ajfaaf9", {
    expiresIn: "15d",
  });
};
StudentSchema.methods.getResetToken = function () {
  const resetToken = crypto.randomBytes(20).toString("hex");

  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;

  return resetToken;
};

const Student = mongoose.model("Student", StudentSchema);
export default Student;
