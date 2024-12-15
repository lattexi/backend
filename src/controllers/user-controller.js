import { fetchUsers, fetchUserById, addUser, changeUser, removeUser } from "../models/user-model.js";

const getUsers = async (req, res) => {
    try {
        const users = await fetchUsers();
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching users' });
    }
};

const postUser = async (req, res) => {
    try {
        console.log('post req body', req.body);
        const newUser = {
            username: req.body.username,
            email: req.body.email,
            created_at: new Date().toISOString(),
        };
        const id = await addUser(newUser);
        if (!id) {
            return res.status(400).json({ message: 'Something went wrong. User not added' });
        }
        res.status(201).json({ message: 'User added', id: id });
    } catch (error) {
        res.status(500).json({ message: 'Error adding user' });
    }
};

const getUserById = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const user = await fetchUserById(id);
        if (user) {
            res.json(user);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error fetching user' });
    }
};

const putUser = async (req, res) => {
    try {
        console.log('put req body', req.body);
        const updatedUser = {
            username: req.body.username,
            email: req.body.email,
            updated_at: new Date().toISOString(),
        };
        const id = parseInt(req.params.id);
        const user = await changeUser(id, updatedUser);
        if (user) {
            res.json({ message: 'User updated', user: user });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error updating user' });
    }
};

const deleteUser = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const user = await removeUser(id);
        if (user) {
            res.json({ message: 'User deleted', user: user });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error deleting user' });
    }
};

export { getUsers, postUser, getUserById, putUser, deleteUser };