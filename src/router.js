const handlers = require('./handler.js');
const url = require('url');


const router = (request,response ) => {
    const endpoint = request.url;

    if ( endpoint === '/'){
handlers.handleHome(request,response);  
   
} else if(endpoint.indexOf('public') !== -1) {
 handlers.handlePublic(request,response,endpoint)
   
} else if(endpoint.indexOf('search') !== -1) {
handlers.handleSearch(request,response,endpoint)
} else{
        response.writeHead(404, {'Content-type': 'text/html'});
        response.end('<h1>404 not found</h1>');
    }
}

module.exports = router;