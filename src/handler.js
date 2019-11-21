const fs = require('fs');
const path = require('path');


const handleHome = (request, response) => {
    const filePath = path.join(__dirname, '..', 'public', 'index.html');
    fs.readFile(filePath, (error, file) => {
        if (error) {
            console.log(error);
            response.writeHead(500, {'Content-type': 'text/html'});
            response.end("<h1> Sorry we've had a problem");
        } else {
            response.writeHead(200, {'Content-type': 'text/html'});
            response.end(file);
        }
    });
};

const handlePublic = (request,response,endpoint) => {
    const extension = endpoint.split('.')[1]
    const extensionType = {
        html:'text/html',
        css: 'text/css',
        js: 'application/javascript',
        json : 'application/json'
    };
    const filePath = path.join(__dirname, '..' , endpoint);
    fs.readFile(filePath, (error , file)=> {
       if(error){
        console.log(error);
        response.writeHead(404, {'Content-type': 'text/html'});
        response.end("<h1> Sorry we've had a problem");  
       } else{
           response.writeHead(200,{'Content-type': extensionType[extension]});
           response.end(file);
       }  
    });
    console.log(endpoint);

}


  

module.exports = {handlePublic,handleHome};