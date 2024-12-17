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
/**
 * @api {get} /likes/media/:id Get Likes by Media ID
 * @apiName GetLikesByMediaId
 * @apiGroup Likes
 * @apiVersion 1.0.0
 *
 * @apiParam {Number} id Media's unique ID.
 *
 * @apiSuccess {Object[]} likes List of likes for the specified media.
 * @apiSuccessExample {json} Success-Response:
 *   HTTP/1.1 200 OK
 *   [
 *     {
 *       "like_id": 1,
 *       "media_id": 1,
 *       "user_id": 1,
 *       "created_at": "2021-08-01T12:00:00.000Z"
 *     },
 *     {
 *       "like_id": 2,
 *       "media_id": 1,
 *       "user_id": 2,
 *       "created_at": "2021-08-01T12:00:00.000Z"
 *     }
 *   ]
 * @apiError {String} message Error message
 */

likesRouter.route('/user/:id')
    .get(
        param('id').isInt().withMessage('User ID must be an integer'),
        validationErrorHandler,
        getLikesByUserId
    )
    /**
     * @api {get} /likes/user/:id Get Likes by User ID
     * @apiName GetLikesByUserId
     * @apiGroup Likes
     * @apiVersion 1.0.0
     *
     * @apiParam {Number} id User's unique ID.
     *
     * @apiSuccess {Object[]} likes List of likes made by the specified user.
     * @apiSuccessExample {json} Success-Response:
     *   HTTP/1.1 200 OK
     *   [
     *     {
     *       "like_id": 1,
     *       "media_id": 1,
     *       "user_id": 1,
     *       "created_at": "2021-08-01T12:00:00.000Z"
     *     },
     *     {
     *       "like_id": 2,
     *       "media_id": 2,
     *       "user_id": 1,
     *       "created_at": "2021-08-01T12:00:00.000Z"
     *     }
     *   ]
     * @apiError {String} message Error message
     */;

likesRouter.route('/')
    .post(
        body('mediaId').isInt().withMessage('Media ID must be an integer'),
        body('userId').isInt().withMessage('User ID must be an integer'),
        validationErrorHandler,
        postLike
    )
    /**
     * @api {post} /likes Add a Like
     * @apiName AddLike
     * @apiGroup Likes
     * @apiVersion 1.0.0
     *
     * @apiBody {Number} mediaId Media's unique ID.
     * @apiBody {Number} userId User's unique ID.
     *
     * @apiSuccess {String} message Success message.
     * @apiSuccess {Number} like_id ID of the newly added like.
     * @apiSuccessExample {json} Success-Response:
     *   HTTP/1.1 201 Created
     *   {
     *     "message": "Like added successfully",
     *     "like_id": 3
     *   }
     * @apiError {String} message Error message.
     */;

likesRouter.route('/:id')
    .delete(
        param('id').isInt().withMessage('Like ID must be an integer'),
        validationErrorHandler,
        deleteLike
    )
    /**
     * @api {delete} /likes/:id Delete a Like
     * @apiName DeleteLike
     * @apiGroup Likes
     * @apiVersion 1.0.0
     *
     * @apiParam {Number} id Like's unique ID.
     *
     * @apiSuccess {String} message Success message.
     * @apiSuccessExample {json} Success-Response:
     *   HTTP/1.1 200 OK
     *   {
     *     "message": "Like deleted successfully"
     *   }
     */;

export default likesRouter;
