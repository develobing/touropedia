import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/user.js';

export const signup = async (req, res) => {
  try {
    const { email, password, firstName, lastName } = req.body;
    const oldUser = await User.findOne({ email });

    if (oldUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const user = await User.create({
      email,
      password: hashedPassword,
      name: `${firstName} ${lastName}`,
    });

    const token = generateToken(user);

    res.status(200).json({ result: getUserInfo(user), token });
  } catch (error) {
    console.log('signup() - error', error);
    res.status(500).json({ message: 'Something went wrong' });
  }
};

export const signin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User doesn't exist" });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: 'Invalid inputs' });
    }

    const token = generateToken(user);

    res.status(200).json({ result: getUserInfo(user), token });
  } catch (error) {
    console.log('signin() - error', error);
    res.status(500).json({ message: 'Something went wrong' });
  }
};

export const googleSignin = async (req, res) => {
  try {
    const { email, name, googleId } = req.body;

    // Check if user already exists with the same email
    let user = await User.findOne({ email });
    if (!user) {
      user = await User.create({
        email,
        name,
        googleId,
      });
    }

    const token = generateToken(user);

    res.status(200).json({ result: getUserInfo(user), token });
  } catch (error) {
    console.log('googleSignin() - error', error);
    res.status(500).json({ message: 'Something went wrong' });
  }
};

export function getUserInfo(user) {
  return {
    _id: user._id.toString(),
    email: user.email,
    name: user.name,
  };
}

function generateToken(user) {
  return jwt.sign(
    {
      email: user.email,
      id: user._id,
      googleId: user.googleId,
    },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRE }
  );
}
