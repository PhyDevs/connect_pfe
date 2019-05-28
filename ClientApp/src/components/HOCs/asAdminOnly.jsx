import React from 'react';
import { Redirect } from '@reach/router';
import { isAuthenticated, getUserInfo } from '../../utils/authenticator';

const asAdminOnly = Component => props => {
	const { role } = getUserInfo();

	if (!isAuthenticated()) {
		return <Redirect to="/login" noThrow />;
	}
	if (role !== 'admin') {
		return <Redirect to="/" noThrow />;
	}
	return <Component {...props} />;
};

export default asAdminOnly;
