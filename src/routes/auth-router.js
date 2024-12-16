import express from 'express';
import { registerUser, loginUser } from '../controllers/auth-controller.js';
import { validationErrorHandler } from '../middleware/error-handling.js';
import { body } from 'express-validator';

const authRouter = express.Router();

authRouter.post('/register',
    [
        body('email').isEmail().withMessage('Enter a valid email address'),
        body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
        body('username').isString().trim().notEmpty().withMessage('Username is required')
    ],
    validationErrorHandler,
    registerUser);


authRouter.post('/login',
    [
        body('email').isEmail().withMessage('Enter a valid email address'),
        body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
    ],
    validationErrorHandler,
    loginUser);

export default authRouter;