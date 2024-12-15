import express from 'express';
import multer from 'multer';
import { getItemById, getItems, postItem, putItem, deleteItem } from '../controllers/media-controller.js';
import { authenticateToken, isAdmin } from '../middleware/auth.js';

const upload = multer({ dest: 'uploads/' });

const mediaRouter = express.Router();

mediaRouter.route('/')
    .get(getItems)
    .post(upload.single('file'), postItem);

mediaRouter.route('/:id')
    .get(getItemById)
    .put(authenticateToken, upload.single('file'), putItem)
    .delete(authenticateToken, deleteItem);

export default mediaRouter;