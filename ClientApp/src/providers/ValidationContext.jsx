import React from 'react';
import PropTypes from 'prop-types';

const ValidationContext = React.createContext();

const ValidationProvider = ({ children }) => {
	const initLoginErrors = { number: true, password: true };
	const initSignUpErrors = { firstName: true, lastName: true, number: true, password: true };
	const [hasLoginErrors, setHasLoginErrors] = React.useState(initLoginErrors);
	const [hasSignUpErrors, setHasSignUpErrors] = React.useState(initSignUpErrors);

	const state = {
		login: [hasLoginErrors, setHasLoginErrors],
		signUp: [hasSignUpErrors, setHasSignUpErrors],
	};
	return <ValidationContext.Provider value={state}>{children}</ValidationContext.Provider>;
};

ValidationProvider.propTypes = {
	children: PropTypes.node.isRequired,
};

export { ValidationContext, ValidationProvider };
