const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const contactSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	phone: {
		type: String,
		required: false
	},
	creatorID: {
		type: String,
		required: true
	}
},
{
	collection: 'contacts',
	versionKey: false
});

module.exports = contact = mongoose.model('contact', contactSchema);