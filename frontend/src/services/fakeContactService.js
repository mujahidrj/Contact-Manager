// const contacts = [
// 	{ _id: '1', name: 'Larry Brooks', phone: '(973) 792-6682' },
// 	{ _id: '2', name: 'Donald Crane', phone: '(404) 403-8357' },
// 	{ _id: '3', name: 'Ronan Douglas', phone: '(294) 992-6173' },
// 	{ _id: '4', name: 'Damion Crosby', phone: '(735) 431-8041' },
// 	{ _id: '5', name: 'Talia Carter', phone: '(323) 382-0775' },
// 	{ _id: '6', name: 'Darien Griffith', phone: '(611) 746-8991' },
// 	{ _id: '7', name: 'Miya Booth', phone: '(523) 380-3302' },
// 	{ _id: '8', name: 'Justine Rollins', phone: '(511) 820-5175' },
// 	{ _id: '9', name: 'Hugo Mata', phone: '(871) 783-4713' },
// 	{ _id: '10', name: 'John Doe', phone: '(856) 465-2458' },
// 	{ _id: '11', name: 'Kasen Ortiz', phone: '(848) 577-2537' },
// 	{ _id: '12', name: 'Kendall Mcclure', phone: '(382) 869-4034' },
// 	{ _id: '13', name: 'Lauren Ayers', phone: '(419) 409-6578' },
// 	{ _id: '14', name: 'Person14', phone: '(683) 556-9360' },
// ];
import axios from 'axios';
const contacts = JSON.parse(localStorage.getItem('contacts'));
export function getContacts() {
	return contacts;
}

export function getContact(id) {
	return contacts.find(c => c._id === id);
}

export async function saveContact(contact) {
	// check if contact already exists
	// if exists -> call update
	// if doesnt exist -> call create

	let contactInDb = contacts.find(c => c._id === contact._id);
	try {
		if (contactInDb) {
			const updatedContact = await updateContact(contact);
			Object.assign(contactInDb, updatedContact.data);
		} else {
			const newContact = await createContact(contact);
			console.log(newContact.data);
			contacts.push(newContact.data);
		}
		localStorage.setItem('contacts', JSON.stringify(contacts));
	} catch (e) {
		console.error(e);
	}
}

export function deleteContact(id) {
	let contactInDb = contacts.find(c => c._id === id);
	contacts.splice(contacts.indexOf(contactInDb), 1);
	return contactInDb;
}

function updateContact(contact) {
	return axios({
		method: 'post',
		url: `http://localhost:5000/routes/editContact/${contact._id}`,
		data: contact,
		headers: {
			'content-type': 'application/json',
		},
	});
}

function createContact(contact) {
	contact.creatorID = localStorage.getItem('id');
	return axios({
		method: 'post',
		url: 'http://localhost:5000/routes/createContact',
		data: contact,
		headers: {
			'content-type': 'application/json',
		},
	});
}
