import express from 'express';
import { getLikesByMediaId, getLikesByUserId, postLike, deleteLike } from '../controllers/likes-controller.js';

const likesRouter = express.Router();

likesRouter.route('/media/:id')
    .get(getLikesByMediaId);

likesRouter.route('/user/:id')
    .get(getLikesByUserId);

likesRouter.route('/')
    .post(postLike);

likesRouter.route('/:id')
    .delete(deleteLike);

export default likesRouter;