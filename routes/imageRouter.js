import express from 'express';
import { imageControllers } from '../controllers/imageControllers.js';

const imagesRoutes = {
    generate: '/generate',
    saveToCollection: '/save-to-collection',
    getAll: '/get-all',
    getToday: '/get-today',
}

export const imageRouter = express.Router();

imageRouter.get(imagesRoutes.generate, imageControllers.generate);