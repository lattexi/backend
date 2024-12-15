import express from 'express';
import { body, param } from 'express-validator';
import { getLikesByMediaId, getLikesByUserId, postLike, deleteLike } from '../controllers/likes-controller.js';
import { validate } from '../middleware/validate.js';

const likesRouter = express.Router();

likesRouter.route('/media/:id')
    .get(
        param('id').isInt().withMessage('Media ID must be an integer'),
        validate,
        getLikesByMediaId
    );

likesRouter.route('/user/:id')
    .get(
        param('id').isInt().withMessage('User ID must be an integer'),
        validate,
        getLikesByUserId
    );

likesRouter.route('/')
    .post(
        body('mediaId').isInt().withMessage('Media ID must be an integer'),
        body('userId').isInt().withMessage('User ID must be an integer'),
        validate,
        postLike
    );

likesRouter.route('/:id')
    .delete(
        param('id').isInt().withMessage('Like ID must be an integer'),
        validate,
        deleteLike
    );

export default likesRouter;