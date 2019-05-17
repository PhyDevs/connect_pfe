import { hot } from 'react-hot-loader';
import React from 'react';
import { Router } from '@reach/router';
import { ThemeProvider } from './providers/ThemeContext';

const Home = React.lazy(() => import('./pages/HomePage'));
const Login = React.lazy(() => import('./pages/LoginPage'));
const SignUp = React.lazy(() => import('./pages/SignUpPage'));

const App = () => (
	<ThemeProvider>
		<React.Suspense fallback="loading ...">
			<Router>
				<Home path="/" />
				<Login path="/login" />
				<SignUp path="/signup" />
			</Router>
		</React.Suspense>
	</ThemeProvider>
);

export default hot(module)(App);
