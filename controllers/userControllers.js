import { User } from '../models/userModel.js';
import { AppError, asyncError } from '../utils/errorClass.js';
import { cookieOptions, getDataUri, sendToken } from '../utils/features.js';
import cloudinary from 'cloudinary';

export const login = asyncError(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new AppError('Please enter email and password', 400));
  }

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
  let user = await User.findOne({ email });
  if (user) {
    return next(new AppError('User already exists', 400));
  }

  let avatar = undefined;
  // Cloudinary will be added here
  if (req.file) {
    const file = getDataUri(req.file);
    const myCloud = await cloudinary.v2.uploader.upload(file.content);
    avatar = {
      public_id: myCloud.public_id,
      url: myCloud.secure_url,
    };
  }

  user = await User.create({
    name,
    email,
    password,
    address,
    avatar,
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

export const updateProfile = asyncError(async (req, res, next) => {
  const user = await User.findById(req.user._id);

  const { name, email, address, city, country, pinCode } = req.body;

  if (name) user.name = name;
  if (email) user.email = email;
  if (address) user.address = address;
  if (city) user.city = city;
  if (country) user.country = country;
  if (pinCode) user.pinCode = pinCode;

  await user.save();

  res.status(200).json({
    success: true,
    message: 'Profile updated successfully',
  });
});

export const changePassword = asyncError(async (req, res, next) => {
  const user = await User.findById(req.user._id).select('+password');

  const { oldPassword, newPassword } = req.body;

  if (!oldPassword || !newPassword)
    return next(
      new AppError('Please enter an old password and a new password', 400)
    );

  const isMatched = await user.comparePassword(oldPassword);

  if (!isMatched) return next(new AppError('Incorrect old password', 400));

  user.password = newPassword;
  await user.save();

  res.status(200).json({
    success: true,
    message: 'Password changed successfully',
  });
});

export const updatePic = asyncError(async (req, res, next) => {
  const user = await User.findById(req.user._id);

  // Cloudinary will be added here

  const file = getDataUri(req.file);
  await cloudinary.v2.uploader.destroy(user.avatar.public_id);
  const myCloud = await cloudinary.v2.uploader.upload(file.content);
  user.avatar = {
    public_id: myCloud.public_id,
    url: myCloud.secure_url,
  };

  user.save();

  res.status(200).json({
    success: true,
    message: 'Avatar updated successfully',
  });
});
