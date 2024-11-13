// Dummy mock data
const mediaItems = [
    {
        media_id: 9632,
        filename: 'ffd8.jpg',
        filesize: 887574,
        title: 'Favorite drink',
        description: '',
        user_id: 1606,
        media_type: 'image/jpeg',
        created_at: '2023-10-16T19:00:09.000Z',
    },
    {
        media_id: 9626,
        filename: 'dbbd.jpg',
        filesize: 60703,
        title: 'Miika',
        description: 'My Photo',
        user_id: 3671,
        media_type: 'image/jpeg',
        created_at: '2023-10-13T12:14:26.000Z',
    },
    {
        media_id: 9625,
        filename: 'cat2.png',
        filesize: 30635,
        title: 'Aksux',
        description: 'friends',
        user_id: 260,
        media_type: 'image/jpeg',
        created_at: '2023-10-12T20:03:08.000Z',
    },
    {
        media_id: 9592,
        filename: 'f504.jpg',
        filesize: 48975,
        title: 'Desert',
        description: '',
        user_id: 3609,
        media_type: 'image/jpeg',
        created_at: '2023-10-12T06:59:05.000Z',
    },
    {
        media_id: 9590,
        filename: '60ac.jpg',
        filesize: 23829,
        title: 'Basement',
        description: 'Light setup in basement',
        user_id: 305,
        media_type: 'image/jpeg',
        created_at: '2023-10-12T06:56:41.000Z',
    },
];

const fetchMediaItems = () => {
    return mediaItems;
};

const fetchMediaItemById = (id) => {
    const item = mediaItems.find((item) => item.media_id === id);
    if (!item) {
        return null;
    }
    return item;
};

const addMediaItem = (newItem) => {
    newItem.media_id = mediaItems[mediaItems.length - 1].media_id + 1 || 1;
    mediaItems.push(newItem);
    return newItem.media_id;
};

const changeItem = (id, updatedMediaItem) => {
    const item = mediaItems.find((item) => item.media_id === id);
    if (!item) {
        return null;
    }
    const index = mediaItems.indexOf(item);
    mediaItems[index] = { ...item, ...updatedMediaItem };
    return mediaItems[index];
};

const removeMediaItem = (id) => {
    const item = mediaItems.find((item) => item.media_id === id);
    if (!item) {
        return null;
    }
    const index = mediaItems.indexOf(item);
    mediaItems.splice(index, 1);
    return item;
};

export { fetchMediaItems, fetchMediaItemById, addMediaItem, changeItem, removeMediaItem };
export default mediaItems;