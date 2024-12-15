import pool from '../utils/db.js';
import bcrypt from 'bcrypt';

const fetchUsers = async () => {
    const [rows] = await pool.query('SELECT * FROM users');
    return rows;
};

const fetchUserById = async (id) => {
    const [rows] = await pool.query('SELECT * FROM users WHERE user_id = ?', [id]);
    return rows[0] || null;
};

const fetchUserByEmail = async (email) => {
    const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
    console.log(rows[0]);
    return rows[0] || null;
};

const addUser = async (user) => {
    if (!user.password) {
        console.log('missing fields');
    }
    const hashedPassword = await bcrypt.hash(user.password, 10);
    const params = [user.username, hashedPassword, user.email, user.user_level_id];
    const [result] = await pool.query('INSERT INTO Users (username, password, email, user_level_id) VALUES (?, ?, ?, ?)', params);
    return result;
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

export { fetchUsers, fetchUserById, fetchUserByEmail, addUser, changeUser, removeUser };
