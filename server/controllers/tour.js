import mongoose from 'mongoose';
import Tour from '../models/tour.js';

export const getTours = async (req, res) => {
  try {
    const tours = await Tour.find().populate('creator');
    res.status(200).json(tours);
  } catch (error) {
    console.log('getTours() - error', error);
    res.status(500).json({ message: 'Something went wrong' });
  }
};

export const getTour = async (req, res) => {
  try {
    const { _id } = req.params;
    const tour = await Tour.findById(_id).populate('creator');

    res.status(200).json(tour);
  } catch (error) {
    console.log('getTour() - error', error);
    res.status(500).json({ message: 'Something went wrong' });
  }
};

export const getToursByUser = async (req, res) => {
  try {
    const { _userId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(_userId)) {
      return res.status(400).json({ message: "User doesn't exist" });
    }

    const tours = await Tour.find({ creator: _userId }).populate('creator');
    res.status(200).json(tours);
  } catch (error) {
    console.log('getToursByUser() - error', error);
    res.status(500).json({ message: 'Something went wrong' });
  }
};

export const createTour = async (req, res) => {
  try {
    const tour = req.body;
    const creator = req.userId;
    const newTour = new Tour({ ...tour, creator });

    await newTour.save();
    res.status(201).json(newTour);
  } catch (error) {
    console.log('createTour() - error', error);
    res.status(500).json({ message: 'Something went wrong' });
  }
};
