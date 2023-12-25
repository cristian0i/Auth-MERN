import jwt from "jsonwebtoken";
import { config } from "dotenv";
config();

export const validateToken = (req, res, next) => {
  const { token } = req.cookies;
  if (!token) return res.status(401).json(["Unauthorized"]);
  jwt.verify(token, process.env.JWT_SECRET, (error, user) => {
    if (error) return res.status(403).json(["Invalid token"]);
    req.user = user;
    next();
  });
};
