import { hot } from 'react-hot-loader';
import React from 'react';
import { Router } from '@reach/router';
import { ThemeProvider } from './providers/ThemeContext';

const Home = React.lazy(() => import('./pages/HomePage'));
const Login = React.lazy(() => import('./pages/LoginPage'));
const SignUp = React.lazy(() => import('./pages/SignUpPage'));
const NotFound = React.lazy(() => import('./pages/NotFound'));

const App = () => (
	<ThemeProvider>
		<React.Suspense fallback={<div className="loading-con" />}>
			<Router>
				<Home path="/" />
				<Home path="/:departmentId" />
				<Home path="/:departmentId/:courseId" />
				<Login path="/login" />
				<SignUp path="/signup" />
				<NotFound default />
			</Router>
		</React.Suspense>
	</ThemeProvider>
);

export default hot(module)(App);
