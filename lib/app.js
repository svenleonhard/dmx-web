let express = require("express");
const { Server } = require('./Server');

const app = express();
new Server(app, express);
