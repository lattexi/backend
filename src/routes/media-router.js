import express from 'express';
import multer from 'multer';
import { body, param } from 'express-validator';
import { getItemById, getItems, postItem, putItem, deleteItem } from '../controllers/media-controller.js';
import { authenticateToken, isAdmin } from '../middleware/auth.js';
import { validationErrorHandler } from '../middleware/error-handling.js';
import { uploadLimiter } from '../middleware/rate-limit.js';

const upload = multer({ dest: 'uploads/' });

const mediaRouter = express.Router();

mediaRouter.route('/')
    .get(getItems)
    .post(
        uploadLimiter,
        upload.single('file'),
        [
            body('title').isString().trim().notEmpty().withMessage('Title is required'),
            body('description').isString().trim().optional(),
            body('tags').isArray().optional(),
        ],
        validationErrorHandler,
        postItem
    );

mediaRouter.route('/:id')
    .get(
        [
            param('id').isInt().withMessage('Invalid ID format'),
        ],
        validationErrorHandler,
        getItemById
    )
    .put(
        authenticateToken,
        uploadLimiter,
        upload.single('file'),
        [
            param('id').isInt().withMessage('Invalid ID format'),
            body('title').isString().trim().notEmpty().withMessage('Title is required'),
            body('description').isString().trim().optional(),
            body('tags').isArray().optional(),
        ],
        validationErrorHandler,
        putItem
    )
    .delete(
        authenticateToken,
        [
            param('id').isInt().withMessage('Invalid ID format'),
        ],
        validationErrorHandler,
        deleteItem
    );

export default mediaRouter;