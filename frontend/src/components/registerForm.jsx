import React from 'react';
import Joi from 'joi-browser';
import Form from './common/form';
import axios from 'axios';
import { toast } from 'react-toastify';

class RegisterForm extends Form {
	state = {
		data: { username: '', password: '', name: '' },
		errors: {},
	};

	schema = {
		username: Joi.string()
			.required()
			.email()
			.label('Username'),
		password: Joi.string()
			.required()
			.min(5)
			.label('Password'),
		name: Joi.string()
			.required()
			.label('Name'),
	};

	// Where to check for response -> true or false
	// Fix this -> look at pinned webpage on chrome (host OS)
	// Routing issue
	doSubmit = async () => {
		const response = await axios({
			method: 'post',
			url: '/routes/registerUser',
			data: this.state.data,
			headers: {
				'content-type': 'application/json',
			},
		});
		// if successful
		toast.success('Registration Successful!');
		this.props.history.replace('/login');

		console.log(response.data);
	};

	render() {
		return (
			<div>
				<h1>Register</h1>
				<form onSubmit={this.handleSubmit}>
					{this.renderInput('username', 'Username')}
					{this.renderInput('password', 'Password', 'password')}
					{this.renderInput('name', 'Name')}
					{this.renderButton('Register')}
				</form>
			</div>
		);
	}
}

export default RegisterForm;
