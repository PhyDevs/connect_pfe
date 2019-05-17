import React from 'react';
import { Link } from '@reach/router';
import asPrivate from '../components/HOCs/asPrivate';
import { useThemeContext } from '../providers/ThemeContext';

const Home = () => {
	const [isDark, toggleDark] = useThemeContext();

	return (
		<div>
			<h1>
				Home Page <Link to="/login">Login</Link>
			</h1>
			<h2>{isDark ? 'dark' : 'light'}</h2>
			<button type="button" onClick={toggleDark}>
				click Me
			</button>
		</div>
	);
};

export default asPrivate(Home);
