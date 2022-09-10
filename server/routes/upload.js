import express from 'express';
import { uploadImage } from '../controllers/upload.js';

const router = express.Router();

router.post('/images', uploadImage);

export default router;
