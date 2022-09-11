import mongoose from 'mongoose';
import Tour from '../models/tour.js';

export const getTours = async (req, res) => {
  try {
    const { page = 1, searchQuery, limit = 6 } = req.query;
    const title = new RegExp(searchQuery, 'i');
    const searchFilter = !!searchQuery ? { title } : {};
    const startIndex = (Number(page) - 1) * Number(limit);

    const total = await Tour.countDocuments(searchFilter);
    const tours = await Tour.find(searchFilter)
      .populate('creator')
      .limit(Number(limit))
      .skip(startIndex);

    res.status(200).json({
      data: tours,
      currentPage: Number(page),
      totalTours: total,
      numberOfPages: Math.ceil(total / limit),
    });
  } catch (error) {
    console.log('getTours() - error', error);
    res.status(500).json({ message: 'Something went wrong' });
  }
};

export const getToursByTag = async (req, res) => {
  try {
    const { tag } = req.params;
    const tours = await Tour.find({ tags: { $in: tag } });

    res.status(200).json(tours);
  } catch (error) {
    console.log('getToursByTag() - error', error);
    res.status(500).json({ message: 'Something went wrong' });
  }
};

export const getRelatedTours = async (req, res) => {
  try {
    const { _id } = req.params;
    const { tags } = req.body;
    const tours = await Tour.find({
      _id: { $ne: _id },
      tags: { $in: tags },
    })
      .limit(3)
      .populate('creator');

    res.status(200).json(tours);
  } catch (error) {
    console.log('getRelatedTours() - error', error);
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

export const updateTour = async (req, res) => {
  try {
    const { _id } = req.params;
    const { title, description, tags, imageFile, creator } = req.body;

    if (!mongoose.Types.ObjectId.isValid(_id)) {
      return res.status(400).json({ message: `No tour exist wit id: ${_id}` });
    }

    const updatedTour = await Tour.findByIdAndUpdate(
      _id,
      { title, description, tags, imageFile, creator },
      { new: true }
    ).populate('creator');
    res.status(200).json(updatedTour);
  } catch (error) {
    console.log('updateTour() - error', error);
    res.status(500).json({ message: 'Something went wrong' });
  }
};

export const deleteTour = async (req, res) => {
  try {
    const { _id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(_id)) {
      return res.status(400).json({ message: `No tour exist wit id: ${_id}` });
    }

    await Tour.findByIdAndDelete(_id);
    res.status(200).json({ message: 'Tour deleted successfully' });
  } catch (error) {
    console.log('deleteTour() - error', error);
    res.status(500).json({ message: 'Something went wrong' });
  }
};

export const likeTour = async (req, res) => {
  try {
    const { _id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(_id)) {
      return res.status(400).json({ message: `No tour exist wit id: ${_id}` });
    }

    const tour = await Tour.findById(_id);
    const isAlreadyLiked = tour.likes.some(
      (_id) => _id.toString() === req.userId
    );

    if (isAlreadyLiked) {
      tour.likes = tour.likes.filter((_id) => _id.toString() !== req.userId);
    } else {
      tour.likes.push(req.userId);
    }

    const updatedTour = await Tour.findByIdAndUpdate(_id, tour, {
      new: true,
    }).populate('creator');

    res.status(200).json(updatedTour);
  } catch (error) {
    console.log('likeTour() - error', error);
    res.status(500).json({ message: 'Something went wrong' });
  }
};
