import { Schema, model } from 'mongoose';

const product = new Schema({
  name: {
    type: String,
    required: [true, 'Please enter name'],
  },
  description: {
    type: String,
    required: [true, 'Please enter description'],
  },
  price: {
    type: Number,
    required: [true, 'Please enter price'],
  },
  stock: {
    type: Number,
    required: [true, 'Please enter stock'],
  },
  images: [
    {
      public_id: String,
      url: String,
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now(),
  },

  category: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
  },
});

export const Product = model('Product', product);
