import express from "express";
import dotenv from "dotenv";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import cors from "cors";
import connectDB from "./src/config/DB.js";
import apiRoute from "./src/routes/index.js";

dotenv.config();
const app = express();

// set security HTTP headers
app.use(helmet());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(
  cors({
    origin: `http://localhost:3000`,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

connectDB();
app.use("/api", apiRoute);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port- ${process.env.PORT}`);
});
