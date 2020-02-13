const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const contact = require('../models/Contact');

const router = express.Router();
const app = express();

app.use(bodyParser.json());

// POST @ desc
// Deletes a contact within the db
// Checks on id, name, and phone
router.post('/routes/deleteContact', (req, res) =>
{
	var contactToDelete = new contact({
		name: req.body.name,
		phone: req.body.phone,
		creatorID: req.body.creatorID
	});

	contact.remove({creatorID: contactToDelete.creatorID, name: contactToDelete.name}, (err, obj) =>
	{
		console.log('Delete!');
	})
		.then(contact => res.json({deleted: Boolean(contact.deletedCount)}))
		.catch((err) => console.log(err))
});

module.exports = router;