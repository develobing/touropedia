import jwt from 'jsonwebtoken';
import User from '../models/user.js';

const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    if (!token) throw new Error('Token not found');

    let decodedData;
    decodedData = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decodedData?.id;

    next();
  } catch (error) {
    console.log('auth() - error', error);
    res.status(401).json({ message: 'Unauthenticated' });
  }
};

export default auth;
