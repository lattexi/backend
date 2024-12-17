import express from 'express';
import 'dotenv/config';
import authRouter from './routes/auth-router.js';
import mediaRouter from './routes/media-router.js';
import userRouter from './routes/user-router.js';
import likesRouter from './routes/likes-router.js';
import { errorHandler, notFoundHandler } from './middleware/error-handling.js';
import { apiLimiter, authLimiter } from './middleware/rate-limit.js';

const hostname = '127.0.0.1';
const port = 3000;
const app = express();

app.set('view engine', 'pug');
app.set('views', 'src/views');

app.use(express.json());

// Home page (client) as static html, css, js
app.use(express.static('public'));
// Uploaded media files
app.use('/uploads', express.static('uploads'));

// Documentation website by Apidoc
app.use('/api', express.static('doc'));

app.use('/api', apiLimiter);

app.use('/api/auth', authLimiter);
app.use('/api/auth', authRouter);

// Media resource endpoints
app.use('/api/media', mediaRouter);

// User resource endpoints
app.use('/api/users', userRouter);

app.use('/api/likes', likesRouter);

app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});

app.use(notFoundHandler);

app.use(errorHandler);