import { User } from '../models/userModel.js';
import { AppError, asyncError } from '../utils/errorClass.js';
import { cookieOptions, sendToken } from '../utils/features.js';

export const login = asyncError(async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email }).select('+password');
  if (!user) {
    return next(new AppError('incorrect email or password', 401));
  }
  const isPasswordMatch = await user.comparePassword(password);
  if (!isPasswordMatch) {
    return next(new AppError('incorrect email or password', 401));
  }

  // Send response
  sendToken(user, res, 200, `Welcome Back, ${user.name}`);
});

export const signup = asyncError(async (req, res, next) => {
  const { name, email, password, address, city, country, pinCode } = req.body;
  // Cloudinary will be added here
  let user = await User.findOne({ email });
  if (user) {
    return next(new AppError('User already exists', 400));
  }
  user = await User.create({
    name,
    email,
    password,
    address,
    city,
    country,
    pinCode,
  });

  sendToken(user, res, 201, 'Registered Successfully');
});

export const getMyProfile = asyncError(async (req, res, next) => {
  const user = await User.findById(req.user._id);

  res.status(200).json({
    success: true,
    user,
  });
});

export const logOut = asyncError(async (req, res, next) => {
  res
    .status(200)
    .cookie('token', '', { ...cookieOptions, expires: new Date(Date.now()) })
    .json({
      success: true,
      message: 'Logged out successfully',
    });
});
