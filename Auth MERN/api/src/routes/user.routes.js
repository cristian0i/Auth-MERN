import { Router } from "express";
import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { validateSchema } from "../middleware/validateSchema.middleware.js";
import {
  singupSchema,
  singinSchema,
  updateSchema,
} from "../schema/auth.schema.js";
import { createdAccessToken } from "../jwt.js";
import { validateToken } from "../middleware/validateToken.js";

const router = Router();

router.post("/singup", validateSchema(singupSchema), async (req, res, next) => {
  const { username, email, password } = req.body;
  const hashedPassword = bcryptjs.hashSync(password, 10);
  const newUser = new User({ username, email, password: hashedPassword });
  try {
    const userSaved = await newUser.save();
    const token = await createdAccessToken({ id: userSaved._id });

    res.cookie("token", token);
    res.json({
      id: userSaved._id,
      username: userSaved.username,
      email: userSaved.email,
      profilePicture: userSaved.profilePicture,
      createdAt: userSaved.createdAt,
      updateAt: userSaved.updatedAt,
    });
  } catch (error) {
    if (error.code === 11000) {
      let errorMessage = "";
      if (error.keyPattern.username) {
        errorMessage = "Nombre de usuario en uso";
      } else if (error.keyPattern.email) {
        errorMessage = "Email en uso";
      }
      return res.status(409).json([errorMessage]);
    }
    next(error);
  }
});

router.post("/singin", validateSchema(singinSchema), async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const userFound = await User.findOne({ email });
    if (!userFound) return res.status(401).json(["User or password incorrect"]);

    const validatePassword = bcryptjs.compareSync(password, userFound.password);
    if (!validatePassword)
      return res.status(401).json(["User or password incorrect"]);

    const token = await createdAccessToken({ id: userFound._id });
    res.cookie("token", token);
    res.json({
      id: userFound._id,
      username: userFound.username,
      email: userFound.email,
      profilePicture: userFound.profilePicture,
      createdAt: userFound.createdAt,
      updateAt: userFound.updatedAt,
    });
  } catch (error) {
    next(error);
  }
});

router.post("/google", async (req, res, next) => {
  const { email, name, profilePicture } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user) {
      const token = await createdAccessToken({ id: user._id });
      res.cookie("token", token);
      res.json({
        id: user._id,
        username: user.username,
        email: user.email,
        profilePicture: user.profilePicture,
        createdAt: user.createdAt,
        updateAt: user.updatedAt,
      });
    } else {
      const generatePassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);
      const hashedPassword = bcryptjs.hashSync(generatePassword, 10);
      const newUser = new User({
        username:
          name.split(" ").join("").toLowerCase() +
          Math.floor(Math.random() * 10000).toString(),
        email,
        password: hashedPassword,
        profilePicture,
      });
      const userSaved = await newUser.save();
      const token = await createdAccessToken({ id: userSaved._id });

      res.cookie("token", token);
      res.json({
        id: userSaved._id,
        username: userSaved.username,
        email: userSaved.email,
        profilePicture: userSaved.profilePicture,
        createdAt: userSaved.createdAt,
        updateAt: userSaved.updatedAt,
      });
    }
  } catch (error) {
    next(error);
  }
});

router.put(
  "/update/:id",
  validateToken,
  validateSchema(updateSchema),
  async (req, res, next) => {
    if (req.user.id !== req.params.id)
      return res.status(401).json(["You can update only your account"]);
    try {
      if (req.body.password)
        req.body.password = bcryptjs.hashSync(req.body.password, 10);
      const userUpdate = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: {
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
            profilePicture: req.body.profilePicture,
          },
        },
        {
          new: true,
        }
      );
      res.status(200).json({
        id: userUpdate._id,
        username: userUpdate.username,
        email: userUpdate.email,
        profilePicture: userUpdate.profilePicture,
        createdAt: userUpdate.createdAt,
        updateAt: userUpdate.updatedAt,
      });
    } catch (error) {
      if (error.code === 11000) {
        let errorMessage = "";
        if (error.keyPattern.username) {
          errorMessage = "Nombre de usuario en uso";
        } else if (error.keyPattern.email) {
          errorMessage = "Email en uso";
        }
        return res.status(409).json([errorMessage]);
      }
      next(error);
    }
  }
);

router.get("/logout", (req, res) => {
  res.clearCookie("token").status(200).json({ message: "signout success" });
});

router.delete("/delete/:id", validateToken, async (req, res, next) => {
  if (req.user.id !== req.params.id)
    return res
      .status(401)
      .json({ message: "You can delete only your account" });
  try {
    await User.findByIdAndDelete(req.params.id);
    res.clearCookie("token");
    res.status(200).json({ message: "User has been deleted" });
  } catch (error) {
    next(error);
  }
});

export default router;
