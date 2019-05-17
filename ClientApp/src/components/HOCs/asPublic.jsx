import React from 'react';
import { Redirect } from '@reach/router';
import { isAuthenticated } from '../../utils/authenticator';

const asPublic = Component => props => {
	if (isAuthenticated()) {
		return <Redirect to="/" noThrow />;
	}
	return <Component {...props} />;
};

export default asPublic;
