import express from 'express'
import cookieParser from 'cookie-parser';

// ENVIRONMENT variables
import { config } from 'dotenv'
config({
  path: './data/config.env'
});

export const app = express();

// * Body Parser, reading data from request's body
app.use(express.json());
app.use(cookieParser())

// import router here
import userRouter from './routes/userRoute.js'
import { errorMiddleware } from './middlewares/ErrorMiddleware.js';

app.use('/api/v1/user', userRouter);

// Global Error Handler
app.use(errorMiddleware)