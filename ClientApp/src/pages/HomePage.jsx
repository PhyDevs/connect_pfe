/* eslint-disable react/destructuring-assignment */
import React from 'react';
import PropTypes from 'prop-types';
import NotFound from './NotFound';
import asPrivate from '../components/HOCs/asPrivate';
import { DataProvider } from '../providers/DataContext';
import Navigation from '../components/Navigation/Navigation';
import Welcome from '../components/Extra/Welcome';

const Home = props => {
	// eslint-disable-next-line react/prop-types
	return props.location.state && props.location.state.notFound ? (
		<NotFound />
	) : (
		<DataProvider>
			<div style={{ display: 'flex' }}>
				<Navigation uri={props.uri} departmentId={props.departmentId} courseId={props.courseId} />
				<Welcome />
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
