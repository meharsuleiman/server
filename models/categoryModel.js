import { Schema, model } from 'mongoose';

const category = new Schema({
  category: {
    type: String,
    required: [true, 'Please enter category name'],
  },
});

export const Category = model('Category', category);
