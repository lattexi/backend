import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { fetchUserByEmail, addUser } from '../models/user-model.js';
import { customError } from '../middleware/error-handling.js';

const registerUser = async (req, res, next) => {
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
            return next(customError('Something went wrong. User not added', 400));
        }

        res.status(201).json({ message: 'User registered', id });
    } catch (error) {
        return next(customError('Error registering user', 500, error.message));
    }
};

const loginUser = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await fetchUserByEmail(email);

        if (!user) {
            return next(customError('User not found', 404));
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return next(customError('Invalid credentials', 401));
        }

        const token = jwt.sign({ user_id: user.user_id, email: user.email }, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_TOKEN_EXPIRES_IN,
        });

        res.json({ message: 'Login successful', token });
    } catch (error) {
        return next(customError('Error logging in', 500, error.message));
    }
};

export { registerUser, loginUser };