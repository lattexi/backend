import pool from '../utils/db.js';

const fetchUsers = async () => {
    const [rows] = await pool.query('SELECT * FROM users');
    return rows;
};

const fetchUserById = async (id) => {
    const [rows] = await pool.query('SELECT * FROM users WHERE user_id = ?', [id]);
    return rows[0] || null;
};

const addUser = async (newUser) => {
    const [result] = await pool.query('INSERT INTO users SET ?', newUser);
    return result.insertId;
};

const changeUser = async (id, updatedUser) => {
    const [result] = await pool.query('UPDATE users SET ? WHERE user_id = ?', [updatedUser, id]);
    if (result.affectedRows === 0) {
        return null;
    }
    return fetchUserById(id);
};

const removeUser = async (id) => {
    const [result] = await pool.query('DELETE FROM users WHERE user_id = ?', [id]);
    return result.affectedRows > 0;
};

export { fetchUsers, fetchUserById, addUser, changeUser, removeUser };
