const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');

const registerUser = require('./routes/registerUser');
const loginUser = require('./routes/loginUser');
const createContact = require('./routes/createContact');
const deleteContact = require('./routes/deleteContact');
const editContact = require('./routes/editContact');

const db = require('./config/keys').testMongoURI;

require('dotenv').config();

const app = express();
const router = express.Router();

app.use(bodyParser.json());

// Set headers, etc..
app.use((req, res, next) => {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader(
		'Access-Control-Allow-Headers',
		'Origin, X-Requested-With, Content-Type, Accept, Authorization',
	);
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS');
	next();
});

// Routes
app.use('/', loginUser);
app.use('/', registerUser);
app.use('/', createContact);
app.use('/', deleteContact);
app.use('/', editContact);

// Connect to database
mongoose
	.connect(db)
	.then(() => console.log('Connected to MongoDB...'))
	.catch(err => console.log(err));

const port = process.env.PORT || 5000;

<<<<<<< HEAD
app.use(express.static(__dirname + 'frontend/public'));
app.use(express.static(__dirname + 'frontend/build'));

app.get('/', (req, res) => {
	console.log('hi');
	res.sendFile(path.join(__dirname + 'frontend/build/index.html'));
});

app.listen(port, () => console.log(`listening on port: ${port}`));
=======
if (process.env.NODE_ENV === "production")
{
  app.use(express.static("frontend/build"));
}

app.use(express.static(path.join(__dirname, "frontend", "build")));

app.get("*", (req, res) =>
{
  res.sendFile(path.join(__dirname, "frontend", "build", "index.html"));
});

app.listen(port, () => console.log(`listening on port: ${ port }`));
>>>>>>> 92ad58453ba9ac777bbba8afae1826428ea3ddf1
