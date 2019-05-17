import React from 'react';
import { Redirect } from '@reach/router';
import { isAuthenticated } from '../../utils/authenticator';

const asPrivate = Component => props => {
	if (!isAuthenticated()) {
		return <Redirect to="/login" noThrow />;
	}
	return <Component {...props} />;
};

export default asPrivate;
