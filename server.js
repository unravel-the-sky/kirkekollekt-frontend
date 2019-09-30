const express = require('express');
const forceSecure = require('force-secure-express')
var history = require('connect-history-api-fallback')
const serveStatic = require("serve-static")
const path = require('path');
var app = express();

app.use(forceSecure(['kirkekollekt.no', ['www.kirkekollekt.no']]));
app.use(history())

app.use(serveStatic(path.join(__dirname, 'dist')));
const port = process.env.PORT || 80;
app.listen(port);