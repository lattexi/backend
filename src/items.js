// Dummy mock data
const items = [
    { id: 1, name: 'Item1' },
    { id: 2, name: 'Item2' },
];

// Utility function to handle request body
const getRequestBody = (req) => {
    return new Promise((resolve, reject) => {
        let body = [];
        req.on('data', (chunk) => {
            body.push(chunk);
        });
        req.on('end', () => {
            try {
                body = Buffer.concat(body).toString();
                resolve(JSON.parse(body));
            } catch (error) {
                reject(error);
            }
        });
        req.on('error', (error) => reject(error));
    });
};

// Utility function to send response
const sendResponse = (res, statusCode, message) => {
    res.writeHead(statusCode, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(message));
};

// GET items handler
const getItems = (res) => {
    sendResponse(res, 200, items);
};

// POST item handler
const postItem = async (req, res) => {
    try {
        const item = await getRequestBody(req);
        const largestId = items.reduce((acc, item) => (item.id > acc ? item.id : acc), 0);
        item.id = largestId + 1;
        items.push(item);
        sendResponse(res, 200, { message: 'Item added' });
    } catch (error) {
        sendResponse(res, 500, { message: 'Error processing request', error });
    }
};

// DELETE item handler
const deleteItem = async (req, res) => {
    try {
        const item = await getRequestBody(req);
        const index = items.findIndex((element) => element.id === item.id);

        if (index !== -1) {
            items.splice(index, 1);
            sendResponse(res, 200, { message: 'Item removed' });
        } else {
            sendResponse(res, 404, { message: 'Item not found' });
        }
    } catch (error) {
        sendResponse(res, 500, { message: 'Error processing request', error });
    }
};

// PUT/UPDATE item handler (replaces the entire item)
const changeItem = async (req, res) => {
    try {
        const item = await getRequestBody(req);
        const index = items.findIndex((element) => element.id === item.id);

        if (index !== -1) {
            items[index] = item;
            sendResponse(res, 200, { message: 'Item changed' });
        } else {
            sendResponse(res, 404, { message: 'Item not found' });
        }
    } catch (error) {
        sendResponse(res, 500, { message: 'Error processing request', error });
    }
};

// PATCH item property handler (updates a specific property)
const changeItemProperty = async (req, res) => {
    try {
        const item = await getRequestBody(req);
        const index = items.findIndex((element) => element.id === item.id);

        if (index !== -1) {
            // Löysin mielenkiintoisen tavan 
            const propertyToUpdate = Object.keys(item).find(key => key !== 'id');
            if (propertyToUpdate) {
                items[index][propertyToUpdate] = item[propertyToUpdate];
                sendResponse(res, 200, { message: 'Item property changed' });
            } else {
                sendResponse(res, 400, { message: 'Property does not exist' });
            }
        } else {
            sendResponse(res, 404, { message: 'Item not found' });
        }
    } catch (error) {
        sendResponse(res, 500, { message: 'Error processing request', error });
    }
};

export { getItems, postItem, deleteItem, changeItem, changeItemProperty };