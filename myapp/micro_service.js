//Import the necessary libraries/declare the necessary obje
var express = require("express");
var myParser = require("body-parser");
var cors = require('cors');
var app = express();

app.use(cors())

  app.use(myParser.urlencoded({extended : true}));
  app.post("/mint", function(request, response, next) {
    console.log(request.body); //This prints the JSON document received (if it is a JSON document)
    response.sendStatus(200)
    });

  app.post("/transfer", function(request, response, next) {
    console.log(request.body); //This prints the JSON document received (if it is a JSON document)
    response.sendStatus(200)
    });

app.listen(8080);
