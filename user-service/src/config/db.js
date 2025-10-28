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
const sql = require("mssql");
require("dotenv").config();

const config = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_SERVER,
  database: process.env.DB_DATABASE,
  port: parseInt(process.env.DB_PORT || "1433"),
  options: {
    encrypt: false,
    trustServerCertificate: true
  }
};

// Tạo pool kết nối duy nhất cho toàn ứng dụng
let poolPromise;

async function connectDB() {
  try {
    if (!poolPromise) {
      poolPromise = new sql.ConnectionPool(config)
        .connect()
        .then(pool => {
          console.log("✅ Connected to SQL Server successfully!");
          return pool;
        })
        .catch(err => {
          console.error("❌ Database connection failed:", err);
          poolPromise = null;
        });
    }
    return poolPromise;
  } catch (err) {
    console.error("❌ Unexpected DB connection error:", err);
    throw err;
  }
}

module.exports = { sql, connectDB };

