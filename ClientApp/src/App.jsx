import { hot } from 'react-hot-loader';
import React from 'react';
import { Router } from '@reach/router';

import './css/style.css';

const Home = () => <h1>Home Page</h1>;

const App = () => (
	<Router>
		<Home path="/" />
	</Router>
);

export default hot(module)(App);
