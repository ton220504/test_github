const app = require('./app');
const { connectDB, sequelize } = require('./config/db');

const PORT = process.env.PORT || 3002;

(async () => {
    await connectDB();
    await sequelize.sync({ alter: true });
    app.listen(PORT, () => {
        console.log(`User service is running on port ${PORT}`);
    })
})();
