import express from 'express';
import multer from 'multer';
import { body, param } from 'express-validator';
import { getItemById, getItems, postItem, putItem, deleteItem } from '../controllers/media-controller.js';
import { authenticateToken, isAdmin } from '../middleware/auth.js';
import { validate } from '../middleware/validate.js'; // Custom middleware to handle validation results

const upload = multer({ dest: 'uploads/' });

const mediaRouter = express.Router();

mediaRouter.route('/')
    .get(getItems)
    .post(
        upload.single('file'),
        [
            body('title').isString().trim().notEmpty().withMessage('Title is required'),
            body('description').isString().trim().optional(),
            body('tags').isArray().optional(),
        ],
        validate,
        postItem
    );

mediaRouter.route('/:id')
    .get(
        [
            param('id').isMongoId().withMessage('Invalid ID format'),
        ],
        validate,
        getItemById
    )
    .put(
        authenticateToken,
        upload.single('file'),
        [
            param('id').isMongoId().withMessage('Invalid ID format'),
            body('title').isString().trim().notEmpty().withMessage('Title is required'),
            body('description').isString().trim().optional(),
            body('tags').isArray().optional(),
        ],
        validate,
        putItem
    )
    .delete(
        authenticateToken,
        [
            param('id').isMongoId().withMessage('Invalid ID format'),
        ],
        validate,
        deleteItem
    );

export default mediaRouter;