import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import morgan from 'morgan';
import fileUpload from 'express-fileupload';
import userRouter from './routes/user.js';
import tourRouter from './routes/tour.js';
import uploadRouter from './routes/upload.js';

// Environment variables
dotenv.config();

const app = express();

// Middlewares
app.use(morgan('dev'));
app.use(cors());
app.use(express.static('public'));
app.use(express.json({ limit: '30mb', extended: true }));
app.use(express.urlencoded({ limit: '30mb', extended: true }));
app.use(
  fileUpload({
    limits: { fileSize: 2 * 1024 * 1024 },
  })
);

// Routes
app.use('/users', userRouter);
app.use('/tours', tourRouter);
app.use('/uploads', uploadRouter);

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
