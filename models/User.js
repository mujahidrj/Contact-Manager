const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
	name: {
		type: String,
		required: false
	},
	username: {
		type: String,
		required: true
	},
	password: {
		type: String,
		reuired: true
	}
},
{
	collection: 'users',
	versionKey: false
});

module.exports = user = mongoose.model('user', userSchema);