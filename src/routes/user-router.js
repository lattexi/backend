import express from 'express';
import { body, param } from 'express-validator';
import { getUsers, getUserById, postUser, putUser, deleteUser } from '../controllers/user-controller.js';
import { authenticateToken } from '../middleware/auth.js';
import { validationErrorHandler } from '../middleware/error-handling.js';

const userRouter = express.Router();

userRouter.route('/')
    .get(getUsers)
    .post(
        [
            body('name').isString().trim().notEmpty().withMessage('Name is required'),
            body('email').isEmail().normalizeEmail().withMessage('Valid email is required'),
            body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
        ],
        validationErrorHandler,
        postUser
    );

userRouter.route('/:id')
    .get(
        authenticateToken,
        [
            param('id').isInt().withMessage('Invalid user ID')
        ],
        validationErrorHandler,
        getUserById
    )
    .put(
        authenticateToken,
        [
            param('id').isInt().withMessage('Invalid user ID'),
            body('name').optional().isString().trim().notEmpty().withMessage('Name must be a non-empty string'),
            body('email').optional().isEmail().normalizeEmail().withMessage('Valid email is required'),
            body('password').optional().isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
        ],
        validationErrorHandler,
        putUser
    )
    .delete(
        authenticateToken,
        [
            param('id').isInt().withMessage('Invalid user ID')
        ],
        validationErrorHandler,
        deleteUser
    );

export default userRouter;