import http from 'http';
import { getItems, postItem, deleteItem, changeItem, changeItemProperty, getMin, getMax, getSum, getAverage, getMedian } from './items.js';
const hostname = '127.0.0.1';
const port = 3000;

// Create a server object and bind a callback function
// to all request events
const server = http.createServer((req, res) => {
    const { url, method } = req;
    console.log('url:', url, 'method:', method);
    if (url === '/items' && method === 'GET') {
        getItems(res);
    } else if (url === '/items' && method === 'POST') {
        postItem(req, res);
    } else if (url === '/items' && method === 'DELETE') {
        deleteItem(req, res);
    } else if (url === '/items' && method === 'PUT') {
        changeItem(req, res);
    } else if (url === '/items' && method === 'PATCH') {
        changeItemProperty(req, res);
    } else if (url === '/items/min' && method === 'GET') {
        getMin(res);
    } else if (url === '/items/max' && method === 'GET') {
        getMax(res);
    } else if (url === '/items/sum' && method === 'GET') {
        getSum(res);
    } else if (url === '/items/average' && method === 'GET') {
        getAverage(res);
    } else if (url === '/items/median' && method === 'GET') {
        getMedian(res);
    } else {
        // Generic not found response
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: '404', message: 'not found' }));
    }
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});