const rp = require("request-promise"),
	request = require("request"),
	lodash = require("lodash");

async function userCreaterOrUpdater(shouldCreateUser, userId, userToCreate) {
		let user = "";
		if (reqBody.shouldCreateUser) {
			user = await rp("https://jsonplaceholder.typicode.com/users");
		} else {
			user = await rp("https://jsonplaceholder.typicode.com/users/" + userId);

			user.isActive = reqBody.isActive;

			user = await rp("https://jsonplaceholder.typicode.com/users/" + userId, userToCreate);
		}

		return user;
}

module.exports = {
	async createOrUpdateUser(req, res) {
		try {
			const reqBody = req.body;

			const user = await userCreaterOrUpdater(reqBody.shouldCreateUser, reqBody.userId, reqBody.user);

			res.status(200).send({
				user,
			});
		}catch(err) {
			res.status(500).send({
				success: false,
			});
		}
	},

	async activeUsers(req, res) {
		try {
			let user = await rp("https://jsonplaceholder.typicode.com/users");

			user = _.map(user, key => {
				const active = key.isActive;
				if (active) {
					return key;
				}
			});

			res.status(200).send({
				user,
			});
		}catch(err) {
			res.status(500).send({
				success: false,
			});
		}
	},

	async getFirstTenUsers(req, res) {
		// TODO : Finish this
	},

	async getUserByUserId(req, res) {
		try {
			const reqBody = req.body;

			const userId = reqBody.userId;

			if (userId) {
				const user = await rp("https://jsonplaceholder.typicode.com/users/" + userId);

				if (user) {
					res.status(200).send({
						success: true,
						user,
					});
				}
			}
		} catch(err) {
			res.status(500).send({
				success: false,
			});
		}
	},

	async getSeniorCitizenUsers(req, res) {
		try {
			const reqBody = req.body;

			const users = await rp("https://jsonplaceholder.typicode.com/users");

			const seniorCitizenUsers = users.filter(user => user.age > 60 && user.workExperience > 20 && user.isMarried = true);

			res.status(200).send({
				seniorCitizenUsers,
			});
		} catch(err) {
			res.status(500).send({
				success: false,
			});
		}
	}
};