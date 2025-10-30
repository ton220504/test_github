const sql = require('../config/db');
const bcrypt = require('bcrypt');

// 🧱 Tạo người dùng mới
async function createUser(name, email, password) {
  const hashedPassword = await bcrypt.hash(password, 10);

  const result = await sql.query`
    INSERT INTO Users (name, email, password)
    OUTPUT INSERTED.id, INSERTED.name, INSERTED.email
    VALUES (${name}, ${email}, ${hashedPassword})
  `;

  return result.recordset[0];
}

// 🔍 Tìm người dùng theo email
async function findUserByEmail(email) {
  const result = await sql.query`
    SELECT * FROM Users WHERE email = ${email}
  `;
  return result.recordset[0];
}

// 🔍 Tìm người dùng theo ID
async function findUserById(id) {
  const result = await sql.query`
    SELECT id, name, email FROM Users WHERE id = ${id}
  `;
  return result.recordset[0];
}

// 🔐 So sánh mật khẩu
async function matchPassword(enteredPassword, hashedPassword) {
  return bcrypt.compare(enteredPassword, hashedPassword);
}

module.exports = { createUser, findUserByEmail, findUserById, matchPassword };

