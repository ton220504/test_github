// const sql = require('mssql');

// const config = {
//   server: 'np:\\\\.\\pipe\\LOCALDB#AFDDE509\\tsql\\query',
//   database: 'UserServiceDB',
//   options: {
//     trustedConnection: true,
//     trustServerCertificate: true,
//   },
// };

// async function connectDB() {
//   try {
//     await sql.connect(config);
//     console.log('✅ Connected to SQL Server LocalDB successfully!');
//   } catch (error) {
//     console.error('❌ Database connection failed:', error);
//   }
// }
require('dotenv').config();
const sql = require('mssql/msnodesqlv8');

const config = {
  server: '(localdb)\\MSSQLLocalDB',
  database: process.env.DB_DATABASE,
  driver: 'msnodesqlv8',
  options: {
    trustedConnection: true
  }
};

async function connectDB() {
  try {
    await sql.connect(config);
    console.log("✅ SQL LocalDB connected successfully!");
  } catch (err) {
    console.error("❌ SQL Connection Error:", err);
  }
}

connectDB();

module.exports = sql;



