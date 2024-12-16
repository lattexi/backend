/**
 * @file media-router.js
 * @description This file contains the routes for media-related operations.
 * It uses Express.js for routing, Multer for file uploads, and various middlewares for authentication, validation, and rate limiting.
 */

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
    /**
     * @api {get} /media/ Get all media items
     * @apiName GetItems
     * @apiGroup Media
     * @apiSuccess {Object[]} items List of media items.
     * @apiError {Object} 500 Internal Server Error.
     */
    .get(getItems)
    /**
     * @api {post} /media/ Create a new media item
     * @apiName PostItem
     * @apiGroup Media
     * @apiBody {String} title Title of the media item.
     * @apiBody {String} [description] Description of the media item.
     * @apiBody {Array} [tags] Tags associated with the media item.
     * @apiSuccess {Object} item Created media item.
     * @apiError {Object} 400 Validation Error.
     * @apiError {Object} 500 Internal Server Error.
     */
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
    /**
     * @api {get} /media/:id Get media item by ID
     * @apiName GetItemById
     * @apiGroup Media
     * @apiParam {Number} id Media item unique ID.
     * @apiSuccess {Object} item Media item details.
     * @apiError {Object} 400 Invalid ID format.
     * @apiError {Object} 404 Media item not found.
     * @apiError {Object} 500 Internal Server Error.
     */
    .get(
        [
            param('id').isInt().withMessage('Invalid ID format'),
        ],
        validationErrorHandler,
        getItemById
    )
    /**
     * @api {put} /media/:id Update media item by ID
     * @apiName PutItem
     * @apiGroup Media
     * @apiParam {Number} id Media item unique ID.
     * @apiBody {String} title Title of the media item.
     * @apiBody {String} [description] Description of the media item.
     * @apiBody {Array} [tags] Tags associated with the media item.
     * @apiSuccess {Object} item Updated media item.
     * @apiError {Object} 400 Validation Error.
     * @apiError {Object} 404 Media item not found.
     * @apiError {Object} 500 Internal Server Error.
     */
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
    /**
     * @api {delete} /media/:id Delete media item by ID
     * @apiName DeleteItem
     * @apiGroup Media
     * @apiParam {Number} id Media item unique ID.
     * @apiSuccess {String} message Success message.
     * @apiError {Object} 400 Invalid ID format.
     * @apiError {Object} 404 Media item not found.
     * @apiError {Object} 500 Internal Server Error.
     */
    .delete(
        authenticateToken,
        [
            param('id').isInt().withMessage('Invalid ID format'),
        ],
        validationErrorHandler,
        deleteItem
    );

export default mediaRouter;