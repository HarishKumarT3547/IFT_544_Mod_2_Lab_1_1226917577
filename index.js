const httpServer = require('http');
const url = require('url');
const fs = require('fs');
const replaceTemplate = require('./modules/replaceTemplate');

// Read Data from file
const tempCourse = fs.readFileSync(`${__dirname}/data/data.json`, 'utf-8');
const dataObj = JSON.parse(tempCourse);

// Template
const templateHTMLCourse = fs.readFileSync(`${__dirname}/template/templateCourse-1.html`, 'utf-8');



// Create Server
const server = httpServer.createServer( (req, res) => {// call back function
    // const urlParameter = url.parse(req.url, true);
    // console.log(urlParameter.query);
    // console.log(urlParameter.pathname);

    const {query, pathname} = url.parse(req.url, true);
    if (query.id) {// If there is query parameter named id
        // Course page
        if (pathname === '/' || pathname.toLowerCase() === '/course') {
            res.writeHead(200, {// Everything ran successfully
                'Content-type': 'text/html',
            });
            const course = dataObj[Number(query.id)];// Convert string to numeric value
            const strCourseName = JSON.stringify(course);
            const courseHTML = replaceTemplate(templateHTMLCourse, course);
            // res.end(`We received our first request from the client at resource ${urlParameter.pathname.toLowerCase()} 
            // with query parameter ${urlParameter.query.id} ${JSON.stringify(course)}`);// Convert back to string
            res.end(courseHTML);
        }
    }
    else {
        res.writeHead(404, {// Server did not find what you were looking for
            'Content-type': 'text/html',
        });
        res.end(`Resource not found`)
    };
});


// Start listening to requests
server.listen(8000, 'localhost', function () {
    console.log(`Listening to requests on port 8000`);
});