import express from 'express';
import { getTours, createTour } from '../controllers/tour.js';
import auth from '../middlewares/auth.js';

const router = express.Router();

router.get('/', getTours);
router.post('/', auth, createTour);

export default router;
