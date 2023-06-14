import { User } from "../models/userModel.js";
import { AppError, asyncError } from "../utils/errorClass.js";

export const login = asyncError(
  async (req, res, next) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select('+password')

    const isPasswordMatch = await user.comparePassword(password);

    if (!isPasswordMatch) {
      return next(new AppError('incorrect password', 401));
    }

    res.status(200).json({
      success: true,
      message: `Welcome ${user.name}`
    })
  }
)

export const signup = asyncError(
  async (req, res, next) => {
    const { name, email, password, address, city, country, pinCode } = req.body;


    // Cloudinary will be added here

    const user = await User.create(
      { name, email, password, address, city, country, pinCode }
    );


    res.status(201).json({
      success: true,
      user,
    })
  }
)