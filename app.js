import express from 'express'

// ENVIRONMENT variables
import { config } from 'dotenv'
config({
  path: './data/config.env'
});

export const app = express();

// import router here
import userRouter from './routes/userRoute.js'

app.use('/api/v1/user', userRouter);