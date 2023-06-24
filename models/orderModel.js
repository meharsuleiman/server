import { Schema, model } from 'mongoose';

const order = new Schema({
  shippingInfo: {
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
  },
  orderItems: [
    {
      name: {
        type: String,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
      image: {
        type: String,
        required: true,
      },
      product: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
      },
    },
  ],

  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  paymentMethod: {
    type: String,
    enum: ['COD', 'ONLINE'],
    default: 'COD',
  },

  paidAt: Date,
  paymentInfo: {
    id: String,
    status: String,
  },

  itemPrice: {
    type: Number,
    required: true,
  },
  taxPrice: {
    type: Number,
    required: true,
  },
  shippingCharges: {
    type: Number,
    required: true,
  },
  totalAmount: {
    type: Number,
    required: true,
  },

  orderStatus: {
    type: String,
    enum: ['processing', 'shipped', 'delivered'],
    default: 'processing',
  },
  deliveredAt: Date,
  createdAt: {
    type: Date,
    default: new Date(Date.now()),
  },
});

export const Order = model('Order', order);
