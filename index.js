const express = require("express");
const http = require("http");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const mongoose = require("mongoose");
const app = express();
const router = require("./router");

mongoose.connect("mongodb://localhost:27017/utafiti-labs", {
  useNewUrlParser: true
});

//App Settup
//:: Adding middleware
app.use(morgan("combined"));
app.use(bodyParser.json({ type: "*/*" }));

router(app);

// Server Setup
const port = process.env.PORT || 3090;
const server = http.createServer(app);
server.listen(port);

console.log("Server Listening on:::", port);
