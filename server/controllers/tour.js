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
