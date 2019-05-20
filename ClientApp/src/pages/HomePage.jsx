import React from 'react';
import { Link } from '@reach/router';
import PropTypes from 'prop-types';
import asPrivate from '../components/HOCs/asPrivate';
import { useThemeContext } from '../providers/ThemeContext';
import Navigation from '../components/Navigation/Navigation';
import colors from '../utils/colors';

const Home = ({ departmentId, courseId }) => {
	const [isDark, toggleDark] = useThemeContext();

	return (
		<div style={{ display: 'flex' }}>
			<Navigation departmentId={departmentId} courseId={courseId} />
			<div style={{ flexGrow: 1, textAlign: 'center', background: isDark ? colors.dark : colors.light }}>
				<h1>
					Home Page <Link to="/login">Login</Link>
				</h1>
				<h2>{isDark ? 'dark' : 'light'}</h2>
				<button type="button" onClick={toggleDark}>
					click Me
				</button>
			</div>
		</div>
	);
};

Home.propTypes = {
	departmentId: PropTypes.string,
	courseId: PropTypes.string,
};

Home.defaultProps = {
	departmentId: null,
	courseId: null,
};

export default asPrivate(Home);
