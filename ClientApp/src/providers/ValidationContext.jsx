import React from 'react';
import PropTypes from 'prop-types';

const ValidationContext = React.createContext();

const ValidationProvider = ({ children }) => {
	const initLoginErrors = { number: true, password: true };
	const initSignUpErrors = { firstName: true, lastName: true, number: true, password: true };
	const initAddDepartmentErrors = { departmentName: true, departmentAbbr: true };

	const [hasLoginErrors, setHasLoginErrors] = React.useState(initLoginErrors);
	const [hasSignUpErrors, setHasSignUpErrors] = React.useState(initSignUpErrors);
	const [hasAddDepartmentErrors, setHasAddDepartmentErrors] = React.useState(initAddDepartmentErrors);

	const state = React.useMemo(
		() => ({
			login: [hasLoginErrors, setHasLoginErrors],
			signUp: [hasSignUpErrors, setHasSignUpErrors],
			addDepartment: [hasAddDepartmentErrors, setHasAddDepartmentErrors],
		}),
		[hasLoginErrors, hasSignUpErrors, hasAddDepartmentErrors]
	);
	return <ValidationContext.Provider value={state}>{children}</ValidationContext.Provider>;
};

const useValidationContext = formToValidate => {
	const context = React.useContext(ValidationContext);
	if (context === undefined) throw Error('useValidationContext must be used inside ValidationProvider');

	if (['login', 'signUp', 'addDepartment'].indexOf(formToValidate) >= 0) {
		const {
			[formToValidate]: [hasErrors, setErrors],
		} = context;

		return [hasErrors, setErrors];
	}
	return null;
};

ValidationProvider.propTypes = {
	children: PropTypes.node.isRequired,
};

export { useValidationContext, ValidationProvider };
