import express from 'express';
import {
  getTours,
  getTour,
  getToursByUser,
  createTour,
} from '../controllers/tour.js';
import auth from '../middlewares/auth.js';

const router = express.Router();

router.get('/', getTours);
router.get('/:_id', getTour);
router.get('/users/:_userId', auth, getToursByUser);
router.post('/', auth, createTour);

export default router;
