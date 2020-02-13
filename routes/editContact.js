const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const contact = require('../models/Contact');

const router = express.Router();
const app = express();

app.use(bodyParser.json());

// POST @ desc
// Modifies a contact within the db
// Removes current contact, saves new info to simulate editing

// Changes
// Step 1: Find contact in mongo with matching id
// Step 2: Modify that contact with the new params
// Step 3: Save and return the contact
router.post('/routes/editContact/:id', (req, res) => {
	var contactToEdit = new contact({
		name: req.body.name,
		phone: req.body.phone,
		creatorID: req.body.creatorID,
	});

	var updatedContact = new contact({
		name: req.body.name2,
		phone: req.body.phone2,
		creatorID: req.body.creatorID,
	});

	contact
		.remove({ creatorID: contactToEdit.creatorID, name: contactToEdit.name }, (err, obj) => {
			console.log('Delete!');
		})
		.then()
		.catch(err => console.log(err));

	// Error catching -> frontend?

	updatedContact.save().then(user => res.json(updatedContact));
});

module.exports = router;
