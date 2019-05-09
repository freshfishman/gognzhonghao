const http = require('http');
const express = require('express');
const server = express();
const data = require('../src/mockData/data');

server.use(function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
	res.header("Access-Control-Allow-Headers", "X-Requested-With");
	res.header('Access-Control-Allow-Headers', 'Content-Type');
	next();
});

server.use('/mock', data);

//启动服务
http.createServer(server).listen(3000, '192.168.124.24');
//http.createServer(server).listen(3000, '192.168.0.107');
console.log(`Express server start, http://localhost:3000`);

