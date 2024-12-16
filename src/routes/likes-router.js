import express from 'express';
import { body, param } from 'express-validator';
import { getLikesByMediaId, getLikesByUserId, postLike, deleteLike } from '../controllers/likes-controller.js';
import { validationErrorHandler } from '../middleware/error-handling.js';

const likesRouter = express.Router();

likesRouter.route('/media/:id')
    .get(
        param('id').isInt().withMessage('Media ID must be an integer'),
        validationErrorHandler,
        getLikesByMediaId
    );

likesRouter.route('/user/:id')
    .get(
        param('id').isInt().withMessage('User ID must be an integer'),
        validationErrorHandler,
        getLikesByUserId
    );

likesRouter.route('/')
    .post(
        body('mediaId').isInt().withMessage('Media ID must be an integer'),
        body('userId').isInt().withMessage('User ID must be an integer'),
        validationErrorHandler,
        postLike
    );

likesRouter.route('/:id')
    .delete(
        param('id').isInt().withMessage('Like ID must be an integer'),
        validationErrorHandler,
        deleteLike
    );

export default likesRouter;