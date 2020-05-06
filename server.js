var express = require("express");
var app = express();
console.log("express require");
const dotenv = require("dotenv");
dotenv.config();
console.log("dotenv require");
app.use(express.static(__dirname + "/"));
app.listen(process.env.PORT || 8080);
console.log("__dirname require");
