import express from 'express';
import { body, param } from 'express-validator';
import { getUsers, getUserById, postUser, putUser, deleteUser } from '../controllers/user-controller.js';
import { authenticateToken } from '../middleware/auth.js';
import { validationErrorHandler } from '../middleware/error-handling.js';

const userRouter = express.Router();

userRouter.route('/')
    .get(getUsers)
    /**
     * @api {get} /users Get all users
     * @apiName GetUsers
     * @apiGroup Users
     * @apiVersion 1.0.0
     * 
     * @apiSuccess {Object[]} users List of users.
     * @apiSuccessExample {json} Success-Response:
     *   HTTP/1.1 200 OK
     *   [
     *     {
     *       "user_id": 1,
     *       "name": "John Doe",
     *       "email": "john.doe@example.com"
     *     },
     *     {
     *       "user_id": 2,
     *       "name": "Jane Smith",
     *       "email": "jane.smith@example.com"
     *     }
     *   ]
     * @apiError {Object} 500 Internal Server Error.
     */
    .post(
        [
            body('name').isString().trim().notEmpty().withMessage('Name is required'),
            body('email').isEmail().normalizeEmail().withMessage('Valid email is required'),
            body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
        ],
        validationErrorHandler,
        postUser
    )
    /**
    * @api {post} /users Create a new user
    * @apiName PostUser
    * @apiGroup Users
    * @apiVersion 1.0.0
    *  
    * @apiBody {String} name User's name.
    * @apiBody {String} email User's email.
    * @apiBody {String} password User's password.
    * 
    * @apiSuccess {String} message Success message.
    * @apiSuccess {Number} id ID of the newly created user.
    * @apiSuccessExample {json} Success-Response:
    *   HTTP/1.1 201 Created
    *   {
        *     "message": "User created successfully",
        *     "id": 1
        *   }
    * @apiError {Object} 400 Validation Error.
    * @apiError {Object} 500 Internal Server Error.
    */;

userRouter.route('/:id')
    .get(
        authenticateToken,
        [
            param('id').isInt().withMessage('Invalid user ID')
        ],
        validationErrorHandler,
        getUserById
    )
    /**
     * @api {get} /users/:id Get user by ID
     * @apiName GetUserById
     * @apiGroup Users
     * @apiVersion 1.0.0
     * 
     * @apiParam {Number} id User's unique ID.
     * 
     * @apiSuccess {Object} user User details.
     * @apiSuccessExample {json} Success-Response:
     *   HTTP/1.1 200 OK
     *   {
     *     "user_id": 1,
     *     "name": "John Doe",
     *     "email": "john.doe@example.com"
     *   }
     * @apiError {Object} 400 Invalid ID format.
     * @apiError {Object} 404 User not found.
     * @apiError {Object} 500 Internal Server Error.
     */
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
    /**
     * @api {put} /users/:id Update user by ID
     * @apiName PutUser
     * @apiGroup Users
     * @apiVersion 1.0.0
     * 
     * @apiParam {Number} id User's unique ID.
     * @apiBody {String} [name] User's name.
     * @apiBody {String} [email] User's email.
     * @apiBody {String} [password] User's password.
     * 
     * @apiSuccess {String} message Success message.
     * @apiSuccess {Object} user Updated user details.
     * @apiSuccessExample {json} Success-Response:
     *   HTTP/1.1 200 OK
     *   {
     *     "message": "User updated successfully",
     *     "user": {
     *       "user_id": 1,
     *       "name": "John Doe",
     *       "email": "john.doe@example.com"
     *     }
     *   }
     * @apiError {Object} 400 Validation Error.
     * @apiError {Object} 403 Access denied.
     * @apiError {Object} 404 User not found.
     * @apiError {Object} 500 Internal Server Error.
     */
    .delete(
        authenticateToken,
        [
            param('id').isInt().withMessage('Invalid user ID')
        ],
        validationErrorHandler,
        deleteUser
    )
    /**
    * @api {delete} /users/:id Delete user by ID
    * @apiName DeleteUser
    * @apiGroup Users
    * @apiVersion 1.0.0
    * 
    * @apiParam {Number} id User's unique ID.
    * 
    * @apiSuccess {String} message Success message.
    * @apiSuccessExample {json} Success-Response:
    *   HTTP/1.1 200 OK
         *   {
        *     "message": "User deleted successfully"
        *   }
    * @apiError {Object} 400 Invalid ID format.
    * @apiError {Object} 403 Access denied.
     * @apiError {Object} 404 User not found.
    * @apiError {Object} 500 Internal Server Error.
    */;

export default userRouter;
