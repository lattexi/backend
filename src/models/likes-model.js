import pool from '../utils/db.js';

const fetchLikesByMediaId = async (mediaId) => {
    const [rows] = await pool.query('SELECT * FROM Likes WHERE media_id = ?', [mediaId]);
    return rows;
};

const fetchLikesByUserId = async (userId) => {
    const [rows] = await pool.query('SELECT * FROM Likes WHERE user_id = ?', [userId]);
    return rows;
};

const addLike = async (newLike) => {
    const [result] = await pool.query('INSERT INTO Likes SET ?', newLike);
    return result.insertId;
};

const removeLike = async (id) => {
    const [result] = await pool.query('DELETE FROM Likes WHERE like_id = ?', [id]);
    return result.affectedRows > 0;
};

export { fetchLikesByMediaId, fetchLikesByUserId, addLike, removeLike };