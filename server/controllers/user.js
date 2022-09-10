import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/user.js';

export const signup = async (req, res) => {
  const { email, password, firstName, lastName } = req.body;

  try {
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

    const token = jwt.sign(
      {
        email,
        id: user._id,
      },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.status(200).json({ result: getUserInfo(user), token });
  } catch (error) {
    console.log('signup() - error', error);
    res.status(500).json({ message: 'Something went wrong' });
  }
};

export const signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User doesn't exist" });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: 'Invalid inputs' });
    }

    const token = jwt.sign(
      {
        email,
        id: user._id,
      },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.status(200).json({ result: getUserInfo(user), token });
  } catch (error) {
    console.log('signin() - error', error);
    res.status(500).json({ message: 'Something went wrong' });
  }
};

export const googleSignin = async (req, res) => {
  const { email, name, token, googleId } = req.body;

  try {
    const oldUser = await User.findOne({ email });
    if (oldUser) {
      const user = {
        _id: oldUser._id.toString(),
        email: oldUser.email,
        name,
      };

      return res.status(200).json({ result: getUserInfo(user), token });
    }

    const user = await User.create({
      email,
      name,
      googleId,
    });

    res.status(200).json({ result: getUserInfo(user), token });
  } catch (error) {
    console.log('googleSignin() - error', error);
    res.status(500).json({ message: 'Something went wrong' });
  }
};

function getUserInfo(user) {
  return {
    _id: user._id.toString(),
    email: user.email,
    name: user.name,
  };
}
