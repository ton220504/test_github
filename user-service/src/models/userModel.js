const { v4: uuidv4 } = require('uuid');

const users = [
    { id: uuidv4(), name: 'Nguyen Van A', email: 'a@example.com' },
    { id: uuidv4(), name: 'Le Thi B', email: 'b@example.com' },
    { id: uuidv4(), name: 'Ngo Thi C', email: 'c@example.com' },
    { id: uuidv4(), name: 'Tran Van D', email: 'd@example.com' },
];

function findAll() {
    return users;
}

function findById(id) {
    return users.find(user => user.id === id);
}

function updateUser(id, name, email) {
    const user = users.find(user => user.id === id);
    if (!user) return null;
    user.name = name;
    user.email = email;
    return user;

}

function createUser(name, email) {
    const newUser = { id: uuidv4(), name, email };
    users.push(newUser);
    return newUser;
}

module.exports = {
    findAll,
    findById,
    createUser,
    updateUser
}