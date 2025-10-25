const app = require('./app');

const PORT = process.env.PORT || 3002;

app.listen(PORT, ()=>{
    console.log(`User service is running on port ${PORT}`);
})