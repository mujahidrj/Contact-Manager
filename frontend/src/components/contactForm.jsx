import React from 'react';
import Joi from 'joi-browser';
import Form from './common/form';
import { getContact, saveContact } from '../services/fakeContactService';

class ContactsForm extends Form {
	state = {
		data: {
			name: '',
			phone: '',
		},
		errors: {},
	};

	schema = {
		_id: Joi.string(),
		name: Joi.string()
			.required()
			.label('Name'),
		phone: Joi.string()
			.required()
			.label('Phone Number'),
	};

	componentDidMount() {
		const contactId = this.props.match.params.id;
		if (contactId === 'new') return;

		const contact = getContact(contactId);
		if (!contact) return this.props.history.replace('/not-found');
		this.setState({ data: this.mapToViewModel(contact) });
	}

	mapToViewModel(contact) {
		return {
			_id: contact._id,
			name: contact.name,
			phone: contact.phone,
		};
	}

	doSubmit = () => {
		saveContact(this.state.data);
		this.props.history.replace('/contacts');
	};

	render() {
		return (
			<div>
				<h1>Contact Form</h1>
				<form onSubmit={this.handleSubmit}>
					{this.renderInput('name', 'Name')}
					{this.renderInput('phone', 'Phone Number')}
					{this.renderButton('Save')}
				</form>
			</div>
		);
	}
}

export default ContactsForm;
