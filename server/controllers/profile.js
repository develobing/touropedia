import mongoose from 'mongoose';
import User from '../models/user.js';
import { getUserInfo } from './user.js';

export const getProfile = async (req, res) => {
  try {
    const { _id } = req.params;
    const profile = await User.findById(_id).select('-password');

    res.status(200).json(profile);
  } catch (error) {
    console.log('getProfile() - error', error);
    res.status(500).json({ message: 'Something went wrong' });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { _id } = req.params;
    const { name, occupation, mobile, address, imageFile } = req.body;

    if (!mongoose.Types.ObjectId.isValid(_id)) {
      return res.status(400).json({ message: "User doesn't exist" });
    }

    const profile = await User.findOneAndUpdate(
      { _id },
      { name, occupation, mobile, address, imageFile },
      { new: true }
    ).select('-password');

    res.status(200).json(profile);
  } catch (error) {
    console.log('updateProfile() - error', error);
    res.status(500).json({ message: 'Something went wrong' });
  }
};
