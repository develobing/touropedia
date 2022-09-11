import express from 'express';
import {
  getTours,
  getTour,
  getToursByTag,
  getToursByUser,
  getRelatedTours,
  getAllTags,
  createTour,
  updateTour,
  deleteTour,
  likeTour,
  loadMoreTours,
} from '../controllers/tour.js';
import auth from '../middlewares/auth.js';

const router = express.Router();

router.get('/', getTours);
router.get('/tags', getAllTags);
router.get('/tags/:tag', getToursByTag);
router.get('/load-more', loadMoreTours);
router.get('/users/:_userId', auth, getToursByUser);
router.get('/:_id', getTour);
router.post('/', auth, createTour);
router.post('/:_id/related-tours', getRelatedTours);
router.put('/:_id', auth, updateTour);
router.delete('/:_id', auth, deleteTour);
router.put('/:_id/likes', auth, likeTour);

export default router;
