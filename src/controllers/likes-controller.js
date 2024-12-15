import { fetchLikesByMediaId, fetchLikesByUserId, addLike, removeLike } from "../models/likes-model.js";

const getLikesByMediaId = async (req, res) => {
    const mediaId = parseInt(req.params.id);
    const likes = await fetchLikesByMediaId(mediaId);
    if (likes) {
        res.json(likes);
    } else {
        res.status(404).json({ message: 'Likes not found for this media item' });
    }
};

const getLikesByUserId = async (req, res) => {
    const userId = parseInt(req.params.id);
    const likes = await fetchLikesByUserId(userId);
    if (likes) {
        res.json(likes);
    } else {
        res.status(404).json({ message: 'Likes not found for this user' });
    }
};

const postLike = async (req, res) => {
    const newLike = {
        media_id: req.body.media_id,
        user_id: req.body.user_id,
        created_at: new Date().toISOString(),
    };
    const id = await addLike(newLike);
    if (!id) {
        return res.status(400).json({ message: 'Something went wrong. Like not added' });
    }
    res.status(201).json({ message: 'Like added', id: id });
};

const deleteLike = async (req, res) => {
    const id = parseInt(req.params.id);
    const like = await removeLike(id);
    if (like) {
        res.json({ message: 'Like deleted', like: like });
    } else {
        res.status(404).json({ message: 'Like not found' });
    }
};

export { getLikesByMediaId, getLikesByUserId, postLike, deleteLike };