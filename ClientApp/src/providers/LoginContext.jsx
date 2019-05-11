import React from 'react';
import PropTypes from 'prop-types';

const LoginContext = React.createContext();

const LoginProvider = ({ children }) => {
	const [hasErrors, setHasErrors] = React.useState({ number: true, password: true });
	return <LoginContext.Provider value={[hasErrors, setHasErrors]}>{children}</LoginContext.Provider>;
};

LoginProvider.propTypes = {
	children: PropTypes.node.isRequired,
};

export { LoginContext, LoginProvider };
