// Dummy mock data
const users = [
    {
        user_id: 1606,
        username: 'JohnDoe',
        email: 'john.doe@example.com',
        created_at: '2023-08-15T14:22:09.000Z',
    },
    {
        user_id: 3671,
        username: 'Miika',
        email: 'miika@example.com',
        created_at: '2023-07-19T10:43:21.000Z',
    },
    {
        user_id: 260,
        username: 'Aksux',
        email: 'aksux@example.com',
        created_at: '2023-06-28T16:13:54.000Z',
    },
    {
        user_id: 3609,
        username: 'DesertFan',
        email: 'desertfan@example.com',
        created_at: '2023-05-05T08:09:38.000Z',
    },
    {
        user_id: 305,
        username: 'LightMaster',
        email: 'lightmaster@example.com',
        created_at: '2023-03-12T21:55:33.000Z',
    },
];

const fetchUsers = () => {
    return users;
};

const fetchUserById = (id) => {
    const user = users.find((user) => user.user_id === id);
    if (!user) {
        return null;
    }
    return user;
};

const addUser = (newUser) => {
    newUser.user_id = users[users.length - 1].user_id + 1 || 1;
    users.push(newUser);
    return newUser.user_id;
};

const changeUser = (id, updatedUser) => {
    const user = users.find((user) => user.user_id === id);
    if (!user) {
        return null;
    }
    const index = users.indexOf(user);
    users[index] = { ...user, ...updatedUser };
    return users[index];
};

const removeUser = (id) => {
    const user = users.find((user) => user.user_id === id);
    if (!user) {
        return null;
    }
    const index = users.indexOf(user);
    users.splice(index, 1);
    return user;
};

export { fetchUsers, fetchUserById, addUser, changeUser, removeUser };
export default users;