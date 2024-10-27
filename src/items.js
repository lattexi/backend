// test data
const items = [
    { id: 1, value: 1 },
    { id: 2, value: 2 },
    { id: 3, value: 3 },
    { id: 4, value: 4 },
    { id: 5, value: 5 },
    { id: 6, value: 6 },
    { id: 7, value: 7 },
    { id: 8, value: 8 },
    { id: 9, value: 9 },
    { id: 10, value: 10 },
];

// req body
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

// response
const sendResponse = (res, statusCode, message) => {
    res.writeHead(statusCode, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(message));
};

// GET
const getItems = (res) => {
    sendResponse(res, 200, items);
};

// POST
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

// DELETE
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

// PUT
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

// PATCH
const changeItemProperty = async (req, res) => {
    try {
        const item = await getRequestBody(req);
        const index = items.findIndex((element) => element.id === item.id);

        if (index !== -1) {
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

// Suurin
const getMax = (res) => {
    const max = items.reduce((acc, item) => (item.value > acc ? item.value : acc), 0);
    sendResponse(res, 200, { result: max });
};

// Pienin
const getMin = (res) => {
    const min = items.reduce((acc, item) => (item.value < acc ? item.value : acc), 1);
    sendResponse(res, 200, { result: min });
};

// Summa
const getSum = (res) => {
    const sum = items.reduce((acc, item) => acc + item.value, 0);
    sendResponse(res, 200, { result: sum });
};

// Keskiarvo
const getAverage = (res) => {
    const sum = items.reduce((acc, item) => acc + item.value, 0);
    const average = items.length > 0 ? sum / items.length : 0;
    sendResponse(res, 200, { result: average });
};

// Mediaani
const getMedian = (res) => {
    const sortedItems = [...items].sort((a, b) => a.value - b.value);
    const middle = Math.floor(sortedItems.length / 2);
    const median = sortedItems.length % 2 === 0
        ? (sortedItems[middle - 1].value + sortedItems[middle].value) / 2
        : sortedItems[middle].value;
    sendResponse(res, 200, { result: median });
};

export { getItems, postItem, deleteItem, changeItem, changeItemProperty };
export { getMin, getMax, getSum, getAverage, getMedian };