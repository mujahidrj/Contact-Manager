import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Table from './common/table';

class ContactsTable extends Component {
	columns = [
		{
			path: 'name',
			label: 'Name',
			content: contact => <Link to={`/contacts/${contact._id}`}>{contact.name}</Link>,
		},
		{ path: 'phone', label: 'Phone Number' },

		{
			key: 'delete',
			content: contact => (
				<button onClick={() => this.props.onDelete(contact)} className="btn btn-danger btn-sm">
					Delete
				</button>
			),
		},
	];

	render() {
		const { contacts, onSort, sortColumn } = this.props;

		return <Table columns={this.columns} data={contacts} sortColumn={sortColumn} onSort={onSort} />;
	}
}

export default ContactsTable;
