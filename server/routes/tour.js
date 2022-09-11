import express from 'express';
import {
  getTours,
  getTour,
  getToursBySearch,
  getToursByTag,
  getToursByUser,
  getRelatedTours,
  createTour,
  updateTour,
  deleteTour,
  likeTour,
} from '../controllers/tour.js';
import auth from '../middlewares/auth.js';

const router = express.Router();

router.get('/', getTours);
router.get('/search', getToursBySearch);
router.get('/tags/:tag', getToursByTag);
router.get('/users/:_userId', auth, getToursByUser);
router.get('/:_id', getTour);
router.post('/', auth, createTour);
router.post('/:_id/related-tours', getRelatedTours);
router.put('/:_id', auth, updateTour);
router.delete('/:_id', auth, deleteTour);
router.put('/:_id/likes', auth, likeTour);

export default router;
