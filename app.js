import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import helmet from 'helmet';
import xss from 'xss-clean';
import hpp from 'hpp';
import mongoSanitize from 'express-mongo-sanitize';

// ENVIRONMENT variables
import { config } from 'dotenv';
config({
  path: './data/config.env',
});

export const app = express();

// * Body Parser, reading data from request's body
app.use(express.json());
app.use(cookieParser());
app.use(helmet());
app.use(mongoSanitize());
app.use(xss());
app.use(
  cors({
    credentials: true,
    methods: ['GET', 'POST', 'DELETE', 'PUT'],
    // origin: [process.env.FRONTEND_URI_1, process.env.FRONTEND_URI_2],
    origin: '*',
  })
);
app.use(
  hpp({
    whitelist: ['category', 'keyword'],
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
