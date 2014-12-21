var express = require('express');
var app = express();
var logger = require('morgan');
app.use(logger("combined"));
app.use(express.static(__dirname + '/app'));
app.listen(process.env.PORT || 3000);