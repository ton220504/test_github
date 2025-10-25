const {v4: uuidv4} = require('uuid');

const users = [
  { id: uuidv4(), name: 'Nguyen Van A', email: 'a@example.com' },
  { id: uuidv4(), name: 'Le Thi B', email: 'b@example.com' },
];

function findAll(){
    return users;
}

function findById(id){
    return users.find(user => user.id === id);
}

function createUser(name, email){
    const newUser = {id: uuidv4(), name, email};
    users.push(newUser);
    return newUser;
}

module.exports={
    findAll,
    findById,
    createUser
}