import { validationResult } from 'express-validator';

const customError = (message, status, errors) => {
    const error = new Error(message);
    error.status = status || 500;
    if (errors) {
        error.errors = errors;
    }
    return error;
};

const validationErrorHandler = (req, res, next) => {
    const errors = validationResult(req, { strictParams: ['body'] });
    if (!errors.isEmpty()) {
        const validationErrors = errors.array({ onlyFirstError: true }).map((error) => {
            return { field: error.path, msg: error.msg };
        });
        return next(customError('Invalid input data', 400, validationErrors));
    }
    next();
};

const notFoundHandler = (req, res, next) => {
    const error = new Error(`Not Found - ${req.originalUrl}`);
    error.status = 404;
    return next(error);
};

const errorHandler = (err, req, res, next) => {
    console.error('errorHandler: ', err.message);
    res.status(err.status || 500);
    res.json({
        error: {
            message: err.message,
            status: err.status || 500,
            errors: err.errors,
        },
    });
};

export { notFoundHandler, errorHandler, customError, validationErrorHandler };