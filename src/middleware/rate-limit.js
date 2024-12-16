import rateLimit from 'express-rate-limit';

// General API limiter
const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per windowMs
    message: {
        error: {
            message: 'Too many requests, please try again later.',
            status: 429
        }
    },
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false // Disable the `X-RateLimit-*` headers
});

// More strict limiter for auth endpoints
const authLimiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 1 hour
    max: 10, // Limit each IP to 5 login/register attempts per hour
    message: {
        error: {
            message: 'Too many login attempts, please try again later.',
            status: 429
        }
    }
});

const uploadLimiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 1 hour
    max: 10, // Limit each IP to 10 uploads per hour
    message: {
        error: {
            message: 'Upload limit reached, please try again later.',
            status: 429
        }
    }
});

export { apiLimiter, authLimiter, uploadLimiter };