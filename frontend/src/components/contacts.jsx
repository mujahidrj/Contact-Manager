import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ContactsTable from './contactsTable';
import Pagination from './common/pagination';
import { getContacts, deleteContact } from '../services/fakeContactService';
import { paginate } from '../utils/paginate';
import _ from 'lodash';
import SearchBox from './searchBox';

class Contacts extends Component {
	state = {
		movies: [],
		contacts: [],
		currentPage: 1,
		pageSize: 6,
		searchQuery: '',
		sortColumn: { path: 'title', order: 'asc' },
	};

	componentDidMount() {
		this.setState({ contacts: getContacts() });
	}

	handleDelete = contact => {
		const contacts = this.state.contacts.filter(c => c._id !== contact._id);
		this.setState({ contacts });

		deleteContact(contact._id);
	};

	handlePageChange = page => {
		this.setState({ currentPage: page });
	};

	handleSearch = query => {
		this.setState({ searchQuery: query, currentPage: 1 });
	};

	handleSort = sortColumn => {
		this.setState({ sortColumn });
	};

	getPagedData = () => {
		const { pageSize, currentPage, sortColumn, searchQuery, contacts: allContacts } = this.state;

		let filtered = allContacts;
		if (searchQuery) {
			// filtered = allContacts.filter(m =>
			// 	m.name.toLowerCase().startsWith(searchQuery.toLowerCase()),
			// );
			// if (filtered.length === 0)
			filtered = allContacts.filter(c => c.name.toLowerCase().includes(searchQuery.toLowerCase()));
		}
		const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

		const contacts = paginate(sorted, currentPage, pageSize);

		return { totalCount: filtered.length, data: contacts };
	};

	render() {
		const { length: count } = this.state.contacts;
		const { pageSize, currentPage, sortColumn, searchQuery } = this.state;

		if (count === 0)
			return (
				<React.Fragment>
					<Link to="/contacts/new" className="btn btn-primary" style={{ marginBottom: 20 }}>
						New Contact
					</Link>
					<p>There are no contacts in the database.</p>
				</React.Fragment>
			);

		const { totalCount, data: contacts } = this.getPagedData();

		return (
			<div className="row">
				<div className="col">
					<Link to="/contacts/new" className="btn btn-primary" style={{ marginBottom: 20 }}>
						New Contact
					</Link>
					<SearchBox value={searchQuery} onChange={this.handleSearch} />
					<ContactsTable
						contacts={contacts}
						sortColumn={sortColumn}
						onDelete={this.handleDelete}
						onSort={this.handleSort}
					/>
					<Pagination
						itemsCount={totalCount}
						pageSize={pageSize}
						currentPage={currentPage}
						onPageChange={this.handlePageChange}
					/>
				</div>
			</div>
		);
	}
}

export default Contacts;
