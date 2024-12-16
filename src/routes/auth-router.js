import express from 'express';
import { registerUser, loginUser } from '../controllers/auth-controller.js';
import { validationErrorHandler } from '../middleware/error-handling.js';
import { body } from 'express-validator';

const authRouter = express.Router();


authRouter.route('/register')
    /**
    * @api {post} /register Register a new user
    * @apiName RegisterUser
    * @apiGroup Auth
    * @apiVersion 1.0.0
    *
    * @apiBody {String} username User's unique username
    * @apiBody {String} email User's unique email address
    * @apiBody {String} password User's password (minimum 6 characters)
    *
    * @apiSuccess {String} message Success message
    * @apiSuccess {Number} id ID of the newly registered user
    *
    * @apiError {Object} error Error object
    * @apiError {String} error.message Error message
    * @apiError {Number} error.status HTTP status code
    */
    .post(
        [
            body('email').isEmail().withMessage('Enter a valid email address'),
            body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
            body('username').isString().trim().notEmpty().withMessage('Username is required')
        ],
        validationErrorHandler,
        registerUser);



authRouter.route('/login')
    /**
     * @api {post} /login Authenticate a user
     * @apiName LoginUser
     * @apiGroup Auth
     * @apiVersion 1.0.0
     *
     * @apiBody {String} email User's email address
     * @apiBody {String} password User's password
     *
     * @apiSuccess {String} message Success message
     * @apiSuccess {String} token JWT authentication token
     *
     * @apiError {Object} error Error object
     * @apiError {String} error.message Error message
     * @apiError {Number} error.status HTTP status code
     */
    .post(
        [
            body('email').isEmail().withMessage('Enter a valid email address'),
            body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
        ],
        validationErrorHandler,
        loginUser);

export default authRouter;