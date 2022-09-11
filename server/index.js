import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import morgan from 'morgan';
import fileUpload from 'express-fileupload';
import { Server } from 'socket.io';
import userRouter from './routes/user.js';
import tourRouter from './routes/tour.js';
import profileRouter from './routes/profile.js';
import uploadRouter from './routes/upload.js';

// Environment variables
dotenv.config();

const app = express();

// Socket Server
const io = new Server({
  cors: {
    origin: process.env.CLIENT_HOST,
    methods: ['GET', 'POST'],
    credentials: true,
  },
});

let onlineUsers = [];

const addNewUser = ({ socketId, userId, userName }) => {
  const isAlreadyOnline = onlineUsers.some((user) => user.userId === userId);
  if (isAlreadyOnline) {
    onlineUsers = onlineUsers.map((user) =>
      user.userId === userId ? { userId, socketId } : user
    );
  } else {
    onlineUsers.push({ userId, socketId });
  }
};

const removeUser = (socketId) => {
  return onlineUsers.filter((user) => user.socketId !== socketId);
};

const getUser = (userId) => {
  return onlineUsers.find((user) => user.userId === userId);
};

io.on('connection', (socket) => {
  socket.on('newUser', ({ userId, userName }) => {
    addNewUser({ socketId: socket.id, userId, userName });
  });

  socket.on('sendNotification', ({ senderName, receiverId }) => {
    const receiver = getUser(receiverId);
    if (receiver) {
      io.to(receiver.socketId).emit('receiveNotification', { senderName });
    }
  });

  socket.on('disconnect', () => {
    removeUser(socket.id);
  });
});

// Middlewares
app.use(morgan('dev'));
app.use(cors());
app.use(express.static('public'));
app.use(express.json({ limit: '30mb', extended: true }));
app.use(express.urlencoded({ limit: '30mb', extended: true }));
app.use(fileUpload());

// Routes
app.use('/users', userRouter);
app.use('/tours', tourRouter);
app.use('/profiles', profileRouter);
app.use('/uploads', uploadRouter);

// MongoDB & Server & Socket Server Connection
const mongoUri = process.env.MONGO_URI;
const port = process.env.PORT || 5005;

mongoose
  .connect(mongoUri)
  .then(() => {
    // Open Server
    const server = app.listen(port, () =>
      console.log(`MongoDB Connected and Server is running on port ${port}`)
    );

    // Open Socket Server
    io.listen(server);
  })
  .catch((error) => console.log(`${error} did not connect`));
