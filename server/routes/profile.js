import express from 'express';
import { getProfile, updateProfile } from '../controllers/profile.js';
import auth from '../middlewares/auth.js';

const router = express.Router();

router.get('/:_id', auth, getProfile);
router.put('/:_id', auth, updateProfile);

export default router;
