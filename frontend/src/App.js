import React, { Component } from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import Contacts from './components/contacts';
import ContactsForm from './components/contactForm';
import NotFound from './components/notFound';
import NavBar from './components/navBar';
import LoginForm from './components/loginForm';
import RegisterForm from './components/registerForm';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

class App extends Component {
	render() {
		return (
			<React.Fragment>
				<ToastContainer />
				<NavBar />
				<main className="container">
					<Switch>
						<Redirect from="/" exact to="/login" />
						<Route path="/register" component={RegisterForm} />
						<Route path="/login" component={LoginForm} />
						<Route path="/contacts/:id" component={ContactsForm} />
						<Route path="/contacts" component={Contacts} />
						<Route path="/not-found" component={NotFound} />
						<Redirect to="/not-found" />
					</Switch>
				</main>
			</React.Fragment>
		);
	}
}

export default App;
