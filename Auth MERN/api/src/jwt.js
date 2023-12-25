import jwt from "jsonwebtoken";
import { config } from "dotenv";
config()

export const createdAccessToken = (id) => {
  return new Promise((resolve, reject) => {
    jwt.sign(id, process.env.JWT_SECRET, {}, (error, token) => {
      if (error) reject(error);
      resolve(token);
    });
  });
};
