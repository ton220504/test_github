const app = require('./app');
const { poolConnect } = require('./config/db');

const PORT = process.env.PORT || 3002;

(async () => {
  try {
    await poolConnect;
    console.log('✅ Connected to SQL Server successfully!');
    app.listen(PORT, () => {
      console.log(`🚀 User service is running on port ${PORT}`);
    });
  } catch (err) {
    console.error('❌ Database connection failed:', err);
  }
})();
