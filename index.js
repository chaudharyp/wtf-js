const express = require('express'),
	mongoose = require("mongoose");

const app = express();

app.use(express.static(__dirname + '/public'));

const commentsController = require("./controller/comments_controller");
app.get('/getAllComments', commentsController.getAllComments);
app.get('/getMultiplePosts', commentsController.fetchMultiplePosts);
app.get('/fetchPostsAndComments', commentsController.fetchPostsAndComments);

const UserController = require("./controller/userController");
app.get('/createOrUpdateUser', commentsController.createOrUpdateUser);
app.get('/activeUsers', commentsController.activeUsers);
app.get('/getUserByUserId', commentsController.getUserByUserId);
app.get('/getSeniorCitizenUsers', commentsController.getSeniorCitizenUsers);

const rp = require("request-promise");

function checkIfJsonPlaceholderApiWorks() {
	const url = "https://jsonplaceholder.typicode.com";
	const placeholderApiRes = rp(url);
}

setInterval(checkIfJsonPlaceholderApiWorks, 604800000);

app.listen(process.env.PORT || 5000);