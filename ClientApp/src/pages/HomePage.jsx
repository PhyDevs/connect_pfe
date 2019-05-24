import React from 'react';
import PropTypes from 'prop-types';
import NotFound from './NotFound';
import asPrivate from '../components/HOCs/asPrivate';
import { DataProvider } from '../providers/DataContext';
import Navigation from '../components/Navigation/Navigation';
import MainArea from '../components/Extra/MainArea';

// eslint-disable-next-line react/prop-types
const Home = ({ departmentId, courseId, uri, location }) => {
	return location.state && location.state.notFound ? (
		<NotFound />
	) : (
		<DataProvider>
			<div style={{ display: 'flex' }}>
				<Navigation uri={uri} departmentId={departmentId} courseId={courseId} />
				<MainArea />
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
