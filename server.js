// server.js

var cors_proxy = require('cors-anywhere');
var express = require('express');

// Set up a basic Express app
var app = express();

// Listen on a specific host and port
var host = process.env.HOST || '0.0.0.0';
var port = process.env.PORT || 8080;

cors_proxy.createServer({
  originWhitelist: [],  // Allow all origins (adjust as needed)
  requireHeader: ['origin', 'x-requested-with'],
  removeHeaders: [],    // Do not remove cookies, pass them along
  // You may need to add this for cookie support
  allowCredentials: true
}).listen(port, host, function() {
  console.log('CORS Anywhere running on ' + host + ':' + port);
});
