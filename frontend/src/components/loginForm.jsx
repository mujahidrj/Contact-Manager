import React from 'react';
import Joi from 'joi-browser';
import Form from './common/form';
import axios from 'axios';
import { toast } from 'react-toastify';

class LoginForm extends Form {
	state = {
		data: { username: '', password: '' },
		errors: {},
	};

	schema = {
		username: Joi.string()
			.required()
			.label('Username'),
		password: Joi.string()
			.required()
			.label('Password'),
	};

	// check for errors
	// if password wrong, if username wrong
	doSubmit = async () => {
		const response = await axios({
			method: 'post',
			url: '/routes/loginUser',
			data: this.state.data,
			headers: {
				'content-type': 'application/json',
			},
		});

		// if successful
		if (response.data.password) {
			toast.success('Login Successful!');
			console.log(response);
			localStorage.setItem('id', response.data.id);
			localStorage.setItem('contacts', JSON.stringify(response.data.contacts));
			window.location = '/contacts';
		} else {
			toast.error("Those credentials don't exist in our database");
		}
	};

	render() {
		return (
			<div>
				<h1>Login</h1>
				<form onSubmit={this.handleSubmit}>
					{this.renderInput('username', 'Username')}
					{this.renderInput('password', 'Password', 'password')}
					{this.renderButton('Login')}
				</form>
			</div>
		);
	}
}

export default LoginForm;
