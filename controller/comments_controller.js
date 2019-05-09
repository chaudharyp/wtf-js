const rp = require("request-promise"),
	req = require("request"),
	lodash = require("lodash");

module.exports = {
	async getAllComments(req,res) {
		try {
			const reqQuery = req.query;
			const postId = reqQuery.postId;

			const comments = await rp("https://jsonplaceholder.typicode.com/comments?postId=" + postId);

			const {limit,searchText} = reqQuery;

			let commentsToReturn = []
			for(let i=0; i<limit;i++){
				commentsToReturn.push(comments[i]);
			}

			const {sortBy}=reqQuery;

			commentsToReturn = _.sortBy(commentsToReturn, sortBy);

			if(commentsToReturn==[]){
			res.status(200).send({
				success:true,
				commentsToReturn: commentsToReturn
			})
			} else {
				res.status(404).send({
					success: false
				})
			}
		}catch(e) {
			console.log("eeeeeeeeeeaaaaaaaaakkkkkkkkkk" + e);

			res.status(500).send({
				success: false
			})
		}
	},

	fetchMultiplePosts(req, res) {
		try {
			const reqQuery = req.query;

			const comments = await rp("https://jsonplacholder.typicode.com/posts");

			const {searchText} = reqQuery;

			let postsToReturn = []
			for(let i=0; i<comments.length;i++){
				if(comments[i].body.includes(searchText)) {
					postsToReturn.push(comments[i]);
				}
			}

			if(postsToReturn==[]){
			res.status(200).send({
				success:true,
				postsToReturn: postsToReturn
			})
			} else {
				res.status(404).send({
					success: false
				})
			}
		}catch(e) {
			console.log("eeeeeeeeeeaaaaaaaaakkkkkkkkkk" + e);

			res.status(500).send({
				success: false
			})
		}
	},

	fetchPostsAndComments(req, res) {
		try {
			const reqQuery = req.query;

			let comments = [], posts = [];
			req("https://jsonplacholder.typicode.com/comments", function(err, res) {
				if(!err) {
					comments = res;
					req("https://jsonplacholder.typicode.com/comments", (err, res) => {
						if(!err) {
							posts  = res;
						}
					})
				}
			})

			let commentsLoaded = 0;
			for(let i = 0; i < comments.length; i++) {
				commentsLoaded++;
			}

			if(comments!=[] && posts!=[]) {
				res.status(200).send({
					comments: comments,
					posts: posts
				})
			} else if(comments!=[]) {
				res.status(200).send({
				comments: comments
				})
			} else if(posts!=[]) {
				res.status(200).send({
					posts: posts
				})
			} else {
				res.status(403).send({
					success: false
				})
			}
		}catch(e) {
			console.log("eeeeeeeeeeaaaaaaaaakkkkkkkkkk" + e);

			res.status(500).send({
				success: false
			})
		}
	},
};