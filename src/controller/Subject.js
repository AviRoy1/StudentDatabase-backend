import Subject from "../model/Subjects.js";

export const addSubject = async (req, res) => {
  try {
    const findSub = await Subject.findOne({ name: req.body.subject });
    if (findSub) {
      return res
        .status(400)
        .json({ message: "The Subject name is already exist" });
    }
    const newsub = await Subject.create({ name: req.body.subject });
    const allsub = await Subject.find();
    return res.status(200).json({ message: "add subject", subjects: allsub });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: "Some error occurs" });
  }
};

export const getAllSubject = async (req, res) => {
  try {
    const allsub = await Subject.find();
    return res.status(200).json({ subjects: allsub });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: "Some error occurs" });
  }
};
