var http = require('http');
var express = require('express');
var path = require('path');

const router = express()
const server = http.createServer(router)
console.log(path.resolve(__dirname, 'client'))
router.use(express.static(path.resolve(__dirname, 'client')));

var port = 3020 || process.env.PORT;


router.use((request, response, next) => {  
  next()
})

server.listen(port, () =>{
	console.log("now server is up on http://localhost:" + port)
})