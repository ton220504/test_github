const fs = require('fs').promises;
const http = require('http');

//example 1
async function readDataExample(){
    try {
        const data = await fs.readFile('data1.json','utf8');
        const students = JSON.parse(data);

        const passed = students.filter(s=>s.score >=8);
        console.log('Students who passed:', passed);
    } catch (error) {
        console.error(error);
    }
}

readDataExample();


//example 2
const data = [
    {id:1, product_name:'Laptop', price:1200},
    {id:2, product_name:'Smartphone', price:800},
    {id:3, product_name:'Tablet', price:400}
];

const server = http.createServer((req, res)=>{
    if (req.url==='/api/product' && req.method==='GET') {
        res.writeHead(200, {'Content-Type':'application/json'});
        res.end(JSON.stringify(data));
    } else {
        res.writeHead(404, {'Content-Type':'text/plain'});
        res.end('404 Not Found!');
    }
})

server.listen(3001, ()=>console.log('Server running on http://localhost:3001/api/product'));