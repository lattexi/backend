import { fetchUsers, fetchUserById, addUser, changeUser, removeUser } from "../models/user-model.js";

const getUsers = (req, res) => {
    res.json(fetchUsers());
};

const postUser = (req, res) => {
    console.log('post req body', req.body);
    const newUser = {
        username: req.body.username,
        email: req.body.email,
        created_at: new Date().toISOString(),
    };
    const id = addUser(newUser);
    if (!id) {
        return res.status(400).json({ message: 'Something went wrong. User not added' });
    }
    res.status(201).json({ message: 'User added', id: id });
};

const getUserById = (req, res) => {
    const id = parseInt(req.params.id);
    const user = fetchUserById(id);
    if (user) {
        res.json(user);
    } else {
        res.status(404).json({ message: 'User not found' });
    }
};

const putUser = (req, res) => {
    console.log('put req body', req.body);
    const updatedUser = {
        username: req.body.username,
        email: req.body.email,
        updated_at: new Date().toISOString(),
    };
    const id = parseInt(req.params.id);
    const user = changeUser(id, updatedUser);
    if (user) {
        res.json({ message: 'User updated', user: user });
    } else {
        res.status(404).json({ message: 'User not found' });
    }
};

const deleteUser = (req, res) => {
    const id = parseInt(req.params.id);
    const user = removeUser(id);
    if (user) {
        res.json({ message: 'User deleted', user: user });
    } else {
        res.status(404).json({ message: 'User not found' });
    }
};

export { getUsers, postUser, getUserById, putUser, deleteUser };