import { fetchMediaItems, fetchMediaItemById, addMediaItem, changeItem, removeMediaItem } from "../models/media-model.js";
import { customError } from "../middleware/error-handling.js";

const getItems = async (req, res, next) => {
    try {
        const items = await fetchMediaItems();
        res.json(items);
    } catch (error) {
        return next(customError('Error fetching media items', 500, error.message));
    }
};

const postItem = async (req, res, next) => {
    try {
        const newMediaItem = {
            title: req.body.title,
            description: req.body.description,
            filename: req.file.filename,
            filesize: req.file.size,
            media_type: req.file.mimetype,
            created_at: new Date().toISOString().slice(0, 19).replace('T', ' '),
            user_id: req.body.user_id,
        };
        const id = await addMediaItem(newMediaItem);
        if (!id) {
            return next(customError('Something went wrong. Item not added', 400));
        }
        res.status(201).json({ message: 'Item added', id: id });
    } catch (error) {
        return next(customError('Error adding media item', 500, error.message));
    }
};

const getItemById = async (req, res, next) => {
    try {
        const id = parseInt(req.params.id);
        const item = await fetchMediaItemById(id);
        if (item) {
            if (req.query.format === 'plain') {
                res.send(item.title);
            } else {
                res.json(item);
            }
        } else {
            return next(customError('Item not found', 404));
        }
    } catch (error) {
        return next(customError('Error fetching media item', 500, error.message));
    }
};

const putItem = async (req, res, next) => {
    try {
        const updatedMediaItem = {
            title: req.body.title,
            description: req.body.description,
            filename: req.file.filename,
            filesize: req.file.size,
            media_type: req.file.mimetype,
            updated_at: new Date().toISOString().slice(0, 19).replace('T', ' '),
        };
        const id = parseInt(req.params.id);
        const item = await fetchMediaItemById(id);
        if (!item) {
            return next(customError('Item not found', 404));
        }
        if (item.user_id !== req.user.user_id) {
            return next(customError('Access denied', 403));
        }
        const updatedItem = await changeItem(id, updatedMediaItem);
        if (updatedItem) {
            res.json({ message: 'Item updated', item: updatedItem });
        } else {
            return next(customError('Item not found', 404));
        }
    } catch (error) {
        return next(customError('Error updating media item', 500, error.message));
    }
};

const deleteItem = async (req, res, next) => {
    try {
        const id = parseInt(req.params.id);
        const item = await fetchMediaItemById(id);
        if (!item) {
            return next(customError('Item not found', 404));
        }
        if (item.user_id !== req.user.user_id) {
            return next(customError('Access denied', 403));
        }
        const success = await removeMediaItem(id);
        if (success) {
            res.json({ message: 'Item deleted' });
        } else {
            return next(customError('Error deleting item', 500));
        }
    } catch (error) {
        return next(customError('Error deleting media item', 500, error.message));
    }
};

export { getItems, postItem, getItemById, putItem, deleteItem };