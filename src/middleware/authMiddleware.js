import { getUserById } from "../models/user/UserModel.js";

export const userAuth = async (req, res, next) => {
  try {
    // check if user exist with _id or not
    const { authorization } = req.headers;

    const user = await getUserById(authorization);
    if (user?._id) {
      req.userId = authorization;
      next();
      return;
    }
    res.status(403).json({
      statu: "error",
      message: "Unauthrized",
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
