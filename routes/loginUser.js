const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const user = require('../models/User');
const contact = require('../models/Contact');

const app = express();

const router = express.Router();

app.use(bodyParser.json());

// POST @ desc:
// Checks for user in db and matches password
// NOTE: dies if empty username because cannot get password to nothing
router.post('/routes/loginUser', (req, res) => {
	const returnJson = { user_in: false, right_password: false };

	user
		.find({ username: req.body.username }, (err, obj) => {
			if (obj.length == 0) {
				res.json(returnJson);
			} else if (obj[0].password == req.body.password) {
				returnJson.user_in = true;
				returnJson.right_password = true;

				returnJson.name = obj[0].name;
				returnJson.id = obj[0]._id;

				// Searches db for all contacts with matching u_id
				contact
					.find({ creatorID: returnJson.id }, (err, obj) => {
						console.log('Searching');
					})
					.then(contact =>
						res.json({ password: returnJson.right_password, id: returnJson.id, contacts: contact }),
					)
					.catch(err => console.log(err));
			}
		})
		.then()
		.catch(err => console.log(err));
});

module.exports = router;
