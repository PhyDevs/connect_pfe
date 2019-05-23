import React from 'react';
import PropTypes from 'prop-types';
import NotFound from './NotFound';
import asPrivate from '../components/HOCs/asPrivate';
import { DataProvider } from '../providers/DataContext';
import Navigation from '../components/Navigation/Navigation';
import Welcome from '../components/Extra/Welcome';
import Header from '../components/Extra/Header';

// eslint-disable-next-line react/prop-types
const Home = ({ departmentId, courseId, uri, location }) => {
	return location.state && location.state.notFound ? (
		<NotFound />
	) : (
		<DataProvider>
			<div style={{ display: 'flex' }}>
				<Navigation uri={uri} departmentId={departmentId} courseId={courseId} />

				<div style={{ flexGrow: 1 }}>
					<Header />
					<Welcome />
				</div>
			</div>
		</DataProvider>
	);
};

Home.propTypes = {
	departmentId: PropTypes.string,
	courseId: PropTypes.string,
	uri: PropTypes.string,
};

Home.defaultProps = {
	departmentId: null,
	courseId: null,
	uri: null,
};

export default asPrivate(Home);
