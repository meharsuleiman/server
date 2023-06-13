import { model, Schema } from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcrypt';

const user = new Schema({
  name: {
    type: String,
    required: [true, 'Please Enter Your Name'],
  },
  email: {
    type: String,
    required: [true, 'Please Enter Your Email'],
    unique: [true, 'Email already exists'],
    validate: validator.isEmail,
  },
  password: {
    type: String,
    required: [true, 'Please Enter Your Password'],
    minLength: [6, 'Password must be at least 6 characters'],
    select: false,
  },
  address: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  pinCode: {
    type: Number,
    required: true,
  },
  role: {
    type: String,
    enum: ['admin', 'user'],
    default: 'user',
  },
  avatar: {
    public_id: String,
    url: String,
  },
  otp: Number,
  otpExpires: Date,
});

user.pre('save', async function () {
  const hashedPassword = await bcrypt.hash(this.password, 10);
  this.password = hashedPassword;
});

user.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
}

export const User = model('User', user)