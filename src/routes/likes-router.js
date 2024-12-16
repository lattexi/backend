import express from 'express';
import { body, param } from 'express-validator';
import { getLikesByMediaId, getLikesByUserId, postLike, deleteLike } from '../controllers/likes-controller.js';
import { validationErrorHandler } from '../middleware/error-handling.js';

const likesRouter = express.Router();


likesRouter.route('/media/:id')
    /**
     * @api {get} /media/:id Get Likes by Media ID
     * @apiName GetLikesByMediaId
     * @apiGroup Likes
     * @apiVersion 1.0.0
     *
     * @apiParam {Number} id Media's unique ID.
     *
     * @apiSuccess {Object[]} likes List of likes for the specified media.
     */
    .get(
        param('id').isInt().withMessage('Media ID must be an integer'),
        validationErrorHandler,
        getLikesByMediaId
    );


likesRouter.route('/user/:id')
    /**
     * @api {get} /user/:id Get Likes by User ID
     * @apiName GetLikesByUserId
     * @apiGroup Likes
     * @apiVersion 1.0.0
     *
     * @apiParam {Number} id User's unique ID.
     *
     * @apiSuccess {Object[]} likes List of likes made by the specified user.
     */
    .get(
        param('id').isInt().withMessage('User ID must be an integer'),
        validationErrorHandler,
        getLikesByUserId
    );


likesRouter.route('/')
    /**
     * @api {post} / Add a Like
     * @apiName AddLike
     * @apiGroup Likes
     * @apiVersion 1.0.0
     *
     * @apiBody {Number} mediaId Media's unique ID.
     * @apiBody {Number} userId User's unique ID.
     *
     * @apiSuccess {String} message Success message.
     * @apiSuccess {Number} like_id ID of the newly added like.
     */
    .post(
        body('mediaId').isInt().withMessage('Media ID must be an integer'),
        body('userId').isInt().withMessage('User ID must be an integer'),
        validationErrorHandler,
        postLike
    );


likesRouter.route('/:id')
    /**
     * @api {delete} /:id Delete a Like
     * @apiName DeleteLike
     * @apiGroup Likes
     * @apiVersion 1.0.0
     *
     * @apiParam {Number} id Like's unique ID.
     *
     * @apiSuccess {String} message Success message.
     */
    .delete(
        param('id').isInt().withMessage('Like ID must be an integer'),
        validationErrorHandler,
        deleteLike
    );

export default likesRouter;