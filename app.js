import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';

// ENVIRONMENT variables
import { config } from 'dotenv';
config({
  path: './data/config.env',
});

export const app = express();

// * Body Parser, reading data from request's body
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    credentials: true,
    methods: ['GET', 'POST', 'DELETE', 'PUT'],
    origin: [process.env.FRONTEND_URI_1, process.env.FRONTEND_URI_2],
  })
);

// import router here
import userRouter from './routes/userRoute.js';
import productRouter from './routes/productRoute.js';
import orderRouter from './routes/orderRoute.js';
import { errorMiddleware } from './middlewares/ErrorMiddleware.js';

app.use('/api/v1/user', userRouter);
app.use('/api/v1/product', productRouter);
app.use('/api/v1/order', orderRouter);

// Global Error Handler
app.use(errorMiddleware);
