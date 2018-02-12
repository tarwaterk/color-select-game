var express = require("express");

var app = express();
var port = process.env.PORT || 8000;

app.use(express.static(__dirname));

app.listen(port, function(req,res) {
    console.log("App listening at http://localhost:" + port);
});