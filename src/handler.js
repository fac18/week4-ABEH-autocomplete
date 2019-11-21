const fs = require('fs');
const path = require('path');
const querystring = require("querystring");
const search = require("./search");

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
        json : 'application/json',
        png: 'image/png'
    };
    const filePath = path.join(__dirname, '..' , 'public', endpoint);
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

const handleSearch = (request, response, endpoint) => {
    let urlObject = url.parse(endpoint);
    let queryObject = querystring.parse(urlObject.query);
    let searchTerm = queryObject.q;
    let result = search(searchTerm);
    response.writeHead(200, { 'Content-type': 'application/json' });
    response.end(JSON.stringify(result));
}


  

module.exports = {handlePublic,handleHome,handleSearch};