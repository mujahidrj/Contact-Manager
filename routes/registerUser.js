const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const user = require('../models/User');

const router = express.Router();
const app = express();

app.use(bodyParser.json());

// POST @ desc
// Creates a user
// Assumes error checking is done by frontend
router.post('/routes/registerUser', (req, res) =>
{
	var loginInfo = new user({
		username: req.body.username,
		name: req.body.name,
		password: req.body.password
	});

	loginInfo.save().then(user => res.json({success: true}));
});


module.exports = router;