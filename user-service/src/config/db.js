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
const sql = require('mssql');

// Cấu hình kết nối
const config = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    server: process.env.DB_SERVER,
    database: process.env.DB_DATABASE,
    options: {
        encrypt: false, // Đặt là true nếu sử dụng Azure SQL Database hoặc cần mã hóa
        trustServerCertificate: true // Đặt là true nếu bạn đang sử dụng chứng chỉ tự ký (ví dụ: SQL Server cục bộ)
    }
};

async function connectDB() {
    try {
        // Kết nối đến database
        await sql.connect(config);
        console.log("Kết nối thành công!");

        // Thực hiện truy vấn
        const result = await sql.query`SELECT * FROM Articles_SearchKeywords`;
        console.dir(result.recordset);

    } catch (err) {
        console.error("Lỗi kết nối hoặc truy vấn:", err);
    } finally {
        // Đóng kết nối
        sql.close();
        console.log("Đã đóng kết nối.");
    }
}

connectDB();

module.exports = { sql, connectDB };
