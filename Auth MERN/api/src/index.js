import express from "express";
import connetDB from "./dataBase.js";
import router from "./routes/user.routes.js";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());
app.use(router);
connetDB();

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Interval Server Error";
  return res.status(statusCode).json([
    message
  ]);
});

app.listen(3000, () => console.log("listen on port 3000"));
