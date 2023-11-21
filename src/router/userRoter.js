import express from "express";
import { getUserByEmail, insertUser } from "../models/user/UserModel.js";
import { comparePassword, hashPassword } from "../utils/bcryptHelper.js";
const router = express.Router();

router.get("/", (req, res, next) => {
  try {
    res.json({
      status: "success",
      message: "to be completed get",
    });
  } catch (error) {
    next(error);
  }
});

//creating user
router.post("/", async (req, res, next) => {
  try {
    const { password } = req.body;

    // hash pass

    req.body.password = hashPassword(password);

    // insert user
    const result = await insertUser(req.body);

    result?._id
      ? res.json({
          status: "success",
          message: "Your account has been created, you may login now",
        })
      : res.json({
          status: "error",
          message:
            "Unable to create an account now, Pelase contact admin for support",
        });
  } catch (error) {
    if (error.message.includes("E11000 duplicate key error collection")) {
      error.message = "There is another user have this email alread exist.";
      error.errorCode = 200;
    }

    next(error);
  }
});

router.post("/login", async (req, res, next) => {
  try {
    const { password, email } = req.body;

    // check if user exist for the given email
    const result = await getUserByEmail(email);

    if (result?.password) {
      // check if the plain pass and the pass from db, the hashed one, is the same
      const isMatched = comparePassword(password, result.password);

      if (isMatched) {
        result.password = undefined;

        return res.json({
          status: "success",
          message: "Logined in successfully",
          user: result,
        });
      }
    }

    res.json({
      status: "error",
      message: "Invalid login details",
    });
  } catch (error) {
    if (error.message.includes("E11000 duplicate key error collection")) {
      error.message = "There is another user have this email alread exist.";
      error.errorCode = 200;
    }

    next(error);
  }
});

router.put("/", (req, res, next) => {
  try {
    res.json({
      status: "success",
      message: "to be completed put",
    });
  } catch (error) {
    next(error);
  }
});

router.patch("/", (req, res, next) => {
  try {
    res.json({
      status: "success",
      message: "to be completed patch",
    });
  } catch (error) {
    next(error);
  }
});

router.delete("/", (req, res, next) => {
  try {
    res.json({
      status: "success",
      message: "to be completed delete",
    });
  } catch (error) {
    next(error);
  }
});

export default router;
