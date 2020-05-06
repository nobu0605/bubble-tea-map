var express = require("express");
var app = express();
const dotenv = require("dotenv");
dotenv.config();
app.use(express.static(__dirname + "/"));
app.listen(process.env.PORT || 8080);
