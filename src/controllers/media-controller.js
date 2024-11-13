import { fetchMediaItems, fetchMediaItemById, addMediaItem, changeItem, removeMediaItem } from "../models/media-model.js";

const getItems = (req, res) => {
    res.json(fetchMediaItems());
};

const postItem = (req, res) => {
    console.log('post req body', req.body);
    console.log('post req file', req.file);
    const newMediaItem = {
        title: req.body.title,
        description: req.body.description,
        filename: req.file.filename,
        filesize: req.file.size,
        media_type: req.file.mimetype,
        created_at: new Date().toISOString(),
    };
    const id = addMediaItem(newMediaItem);
    if (!id) {
        return res.status(400).json({ message: 'Something went wrong. Item not added' });
    }
    res.status(201).json({ message: 'Item added', id: id });
};

const getItemById = (req, res) => {
    const id = parseInt(req.params.id);
    const item = fetchMediaItemById(id);
    if (item) {
        if (req.query.format === 'plain') {
            res.send(item.title);
        } else {
            res.json(item);
        }
    } else {
        res.status(404).json({ message: 'Item not found' });
    }
};

const putItem = (req, res) => {
    console.log('put req body', req.body);
    console.log('put req file', req.file);
    const updatedMediaItem = {
        title: req.body.title,
        description: req.body.description,
        filename: req.file.filename,
        filesize: req.file.size,
        media_type: req.file.mimetype,
        updated_at: new Date().toISOString(),
    };
    const id = parseInt(req.params.id);
    const item = changeItem(id, updatedMediaItem);
    if (item) {
        res.json({ message: 'Item updated', item: item });
    } else {
        res.status(404).json({ message: 'Item not found' });
    }
};

const deleteItem = (req, res) => {
    const id = parseInt(req.params.id);
    const item = removeMediaItem(id);
    if (item) {
        res.json({ message: 'Item deleted', item: item });
    } else {
        res.status(404).json({ message: 'Item not found' });
    }
};

export { getItems, postItem, getItemById, putItem, deleteItem };