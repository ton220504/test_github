const express = require('express');
const userRouter = require('./routes/users');
const authRouter = require('./routes/auth');
const logger = require('./middlewares/logger');
const errorHandler = require('./middlewares/errorHandler');


const app = express();

app.use(express.json());
app.use(logger);

app.use('/api/user', userRouter);
app.use('/api/auth', authRouter);

//Health check
app.get('/health', (req, res)=> res.json({success:true, status:'ok'}));

// Global error handler
app.use(errorHandler);

module.exports = app;