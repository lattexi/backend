import express from 'express';
import { getItemById, getItems, mediaItems, changeItem, postItem, deleteItem } from './media.js';
const hostname = '127.0.0.1';
const port = 3000;
const app = express();

app.set('view engine', 'pug');
app.set('views', 'src/views');

app.use(express.json());

app.get('/', (req, res) => {
    res.render('index', { title: 'Welcome', message: 'Welcome to the API!' });
});

// Home page (client) as static html, css, js
app.use(express.static('public'));
// Uploaded media files
app.use('/media', express.static('media'));

// Api documentation tms. with pug
app.get('/api', (req, res) => {
    res.render('index', {
        title: 'API Documentation',
        message: 'Welcome to my API!',
        exampleData: mediaItems,
    });
});

// Media resource endpoints
app.get('/api/media', (req, res) => {
    getItems(res);
});

app.get('/api/media/:id', (req, res) => {
    getItemById(req, res);
});

app.post('/api/media', (req, res) => {
    postItem(req, res);
});

app.put('/api/media/:id', (req, res) => {
    changeItem(req, res);
});

app.delete('/api/media/:id', (req, res) => {
    deleteItem(req, res);
});

app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});