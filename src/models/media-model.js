import pool from '../utils/db.js';

const fetchMediaItems = async () => {
    const [rows] = await pool.query('SELECT * FROM mediaItems');
    return rows;
};

const fetchMediaItemById = async (id) => {
    const [rows] = await pool.query('SELECT * FROM mediaItems WHERE media_id = ?', [id]);
    return rows[0] || null;
};

const addMediaItem = async (newItem) => {
    const [result] = await pool.query('INSERT INTO mediaItems SET ?', newItem);
    return result.insertId;
};

const changeItem = async (id, updatedMediaItem) => {
    const [result] = await pool.query('UPDATE mediaItems SET ? WHERE media_id = ?', [updatedMediaItem, id]);
    if (result.affectedRows === 0) {
        return null;
    }
    return fetchMediaItemById(id);
};

const removeMediaItem = async (id) => {
    const [result] = await pool.query('DELETE FROM mediaItems WHERE media_id = ?', [id]);
    return result.affectedRows > 0;
};

const mediaItems = fetchMediaItems();

export { fetchMediaItems, fetchMediaItemById, addMediaItem, changeItem, removeMediaItem, mediaItems };
