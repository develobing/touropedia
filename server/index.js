import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import morgan from 'morgan';
import userRouter from './routes/user.js';

// Environment variables
dotenv.config();

const app = express();

// Middlewares
app.use(morgan('dev'));
app.use(cors());
app.use(express.json({ limit: '30mb', extended: true }));
app.use(express.urlencoded({ limit: '30mb', extended: true }));

// Routes
app.use('/users', userRouter);

// MongoDB & Server Connection
const mongoUri = process.env.MONGO_URI;
const port = process.env.PORT || 5005;

mongoose
  .connect(mongoUri)
  .then(() => {
    app.listen(port, () =>
      console.log(`MongoDB Connected and Server is running on port ${port}`)
    );
  })
  .catch((error) => console.log(`${error} did not connect`));
