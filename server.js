axios = require("axios");
var express = require("express");

var PORT = 1197;
var app = express();

var path = require("path");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

require('dotenv').config();

var fs = require("fs");

let pass = process.env.pass;
let fileData = "";

fs.readFile("content.txt", "utf8", function(error, data) {
  console.log(data);
  fileData = data;
});

app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/style.css", function(req, res) {
  res.sendFile(path.join(__dirname, "style.css"));
});

app.get("/main", function(req, res) {
  res.sendFile(path.join(__dirname, "main.html"));
});

app.post("/content", function(req, res){
  let htmlContent = fileData;
  console.log(fileData);
  data = {
    htmlContent: htmlContent,
    retrieved: "false"
  }
  if(req.body.status === "true"){
    data.retrieved = "true";
    res.json({data})
  }
});

app.post("/distance", function(req, res){

  zipOne = req.body.zipOne;
  zipTwo = req.body.zipTwo;

  axios.get("https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=" + zipOne + "&destinations=" + zipTwo + "&key=AIzaSyBhGyqFj_Jm3BVjC6T2ymLzYBvipP0_E-0")
  .then(function (response) {
    console.log(response.data.rows[0].elements[0].distance);
    res.json(response.data.rows[0].elements[0].distance);
  })

});

app.post("/authentication", function(req, res){
  if(req.body.pass === pass){
    res.json({attempt: "Success"});
  }else{
    res.json({attempt: "Fail"})
  }
});


  

app.listen(PORT, function() {
  
});
