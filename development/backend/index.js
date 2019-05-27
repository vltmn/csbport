const serverless = require('serverless-http');
const app = require('./src/server');
const wsHandler = require('./src/ws-handler');
module.exports.handler = serverless(app);
module.exports.wsHandler = wsHandler;
