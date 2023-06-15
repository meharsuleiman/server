import { User } from "../models/userModel.js";
import { AppError, asyncError } from "../utils/errorClass.js";
import jwt from 'jsonwebtoken'

export const isAuthenticated = asyncError(
  async (req, res, next) => {

    const { token } = req.cookies

    if (!token) {
      return next(new AppError('Not Logged in', 401));
    }

    const decodedData = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await User.findById(decodedData._id)


    next();
  }
)