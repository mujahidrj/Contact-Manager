const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const contact = require('../models/Contact');

const router = express.Router();
const app = express();

app.use(bodyParser.json());

// POST @ desc
// Creates a contact within the db
// Links the logged in user with the contact using
// the u_id
router.post('/routes/createContact', (req, res) => {
	var contactInfo = new contact({
		name: req.body.name,
		phone: req.body.phone,
		creatorID: localStorage.getItem('id'),
	});
	contactInfo.save().then(contact => res.json({ success: true }));
});

module.exports = router;
