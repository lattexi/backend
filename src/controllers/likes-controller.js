import { fetchLikesByMediaId, fetchLikesByUserId, addLike, removeLike } from "../models/likes-model.js";
import { customError } from "../middleware/error-handling.js";

const getLikesByMediaId = async (req, res) => {
    const mediaId = parseInt(req.params.id);
    const likes = await fetchLikesByMediaId(mediaId);
    try {
        if (likes) {
            res.json(likes);
        } else {
            return next(customError('Likes not found for this media item', 404));
        }
    } catch (error) {
        return next(customError(error.message, 500));
    }
};

const getLikesByUserId = async (req, res) => {
    const userId = parseInt(req.params.id);
    const likes = await fetchLikesByUserId(userId);
    try {
        if (likes) {
            res.json(likes);
        } else {
            return next(customError('Likes not found for this user', 404));
        }
    } catch (error) {
        return next(customError(error.message, 500));
    }
};

const postLike = async (req, res) => {
    const newLike = {
        media_id: req.body.media_id,
        user_id: req.body.user_id,
        created_at: new Date().toISOString(),
    };
    const id = await addLike(newLike);
    try {
        if (id) {
            res.json({ message: 'Like added', like_id: id });
        }
        else {
            return next(customError('Like not added', 404));
        }
    } catch (error) {
        return next(customError(error.message, 500));
    }
};

const deleteLike = async (req, res) => {
    const id = parseInt(req.params.id);
    const like = await removeLike(id);
    try {
        if (like) {
            res.json({ message: 'Like removed' });
        } else {
            return next(customError('Like not found', 404));
        }
    } catch (error) {
        return next(customError(error.message, 500));
    }
};

export { getLikesByMediaId, getLikesByUserId, postLike, deleteLike };