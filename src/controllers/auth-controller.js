import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { fetchUserByEmail, addUser } from '../models/user-model.js';

const registerUser = async (req, res) => {
    try {
        const { username, email, password, user_level_id } = req.body;

        const user = {
            username,
            email,
            password,
            user_level_id,
            created_at: new Date().toISOString().slice(0, 19).replace('T', ' '),
        };

        const id = await addUser(user);
        if (!id) {
            return res.status(400).json({ message: 'Something went wrong. User not added' });
        }

        res.status(201).json({ message: 'User registered', id });
    } catch (error) {
        res.status(500).json({ message: 'Error registering user', error: error.message });
    }
};

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await fetchUserByEmail(email);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign({ user_id: user.user_id, email: user.email }, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_TOKEN_EXPIRES_IN,
        });

        res.json({ message: 'Login successful', token });
    } catch (error) {
        res.status(500).json({ message: 'Error logging in', error: error.message });
    }
};

export { registerUser, loginUser };