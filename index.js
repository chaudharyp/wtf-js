const express = require('express'),
	mongoose = require("mongoose");

const app = express();

app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res) {
  res.send('Hello World!');
});

const rp = require("request-promise");

function checkIfJsonPlaceholderApiWorks() {
	const url = "https://jsonplaceholder.typicode.com";
	const placeholderApiRes = rp(url);
}

setInterval(checkIfJsonPlaceholderApiWorks, 604800000);

app.listen(process.env.PORT || 5000);