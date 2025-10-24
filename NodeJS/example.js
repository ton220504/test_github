//fs
const fs = require('fs');
const fs_promise = require('fs').promises;

fs.writeFile('example.txt','Hello World!',(err)=>{
    if(err) return console.error(err);
    console.log('File written successfully!');
})
// callback to read the file
fs.readFile('example.txt','utf8',(err, data)=>{
    if(err) return console.error(err);
    console.log(data);
})


//path
const path = require('path');
const fullPath = path.join(__dirname,'data','info.json');
console.log('Full Path:', fullPath);

//http
const http = require('http');


const server = http.createServer((req, res)=>{
    res.writeHead(200, {'Content-Type':'application/json'});
    res.end(JSON.stringify({message:'Hello Node.js server!'}));
});
server.listen(3000,()=>console.log('Server running on http://localhost:3000'));



//Promise
fs_promise.readFile('example.txt','utf8')
.then(data=>console.log('Promise Read:',data))
.catch(err=>console.error(err));


// Async/Await
async function readFileAsync(){
    try {
        const data = await fs_promise.readFile('example.txt','utf8');
        console.log('Async/Await read:', data);
    } catch (error) {
        console.error(error);
    }
}
readFileAsync();

////
console.log(1);
setTimeout(()=>{
    console.log('Timeout after 2 seconds');
}, 2000);
console.log(3);


