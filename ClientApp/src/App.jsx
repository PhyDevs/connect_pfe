import { hot } from 'react-hot-loader';
import React from 'react';
import { Router, Link } from '@reach/router';

const LoginPage = React.lazy(() => import('./pages/LoginPage'));
const SignUpPage = React.lazy(() => import('./pages/SignUpPage'));

const Home = () => (
	<h1>
		Home Page <Link to="/login">Login</Link>
	</h1>
);

const App = () => (
	<React.Suspense fallback="loading ...">
		<Router>
			<Home path="/" />
			<LoginPage path="/login" />
			<SignUpPage path="/signup" />
		</Router>
	</React.Suspense>
);

export default hot(module)(App);
