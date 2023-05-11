import React from 'react';


const ValidationContext = React.createContext<ValidationContextState | undefined>(undefined);

const ValidationProvider = ({ children }: ValidationProviderProps) => {
	const initLoginErrors: ValidationField = { number: true, password: true };
	const initSignUpErrors: ValidationField = { firstName: true, lastName: true, number: true, password: true };
	const initAddDepartmentErrors: ValidationField = { departmentName: true, departmentAbbr: true };

	const [hasLoginErrors, setHasLoginErrors] = React.useState(initLoginErrors);
	const [hasSignUpErrors, setHasSignUpErrors] = React.useState(initSignUpErrors);
	const [hasAddDepartmentErrors, setHasAddDepartmentErrors] = React.useState(initAddDepartmentErrors);

	const state: ValidationContextState = React.useMemo(
		() => ({
			login: [hasLoginErrors, setHasLoginErrors],
			signUp: [hasSignUpErrors, setHasSignUpErrors],
			addDepartment: [hasAddDepartmentErrors, setHasAddDepartmentErrors],
		}),
		[hasLoginErrors, hasSignUpErrors, hasAddDepartmentErrors]
	);
	return <ValidationContext.Provider value={state}>{children}</ValidationContext.Provider>;
};

const useValidationContext = (formToValidate: string): [ValidationField | null, React.Dispatch<React.SetStateAction<ValidationField>> | null] => {
	const context = React.useContext(ValidationContext);
	if (context === undefined) throw Error('useValidationContext must be used inside ValidationProvider');

	if (['login', 'signUp', 'addDepartment'].indexOf(formToValidate) >= 0) {
		const {
			[formToValidate]: [hasErrors, setErrors],
		} = context;

		return [hasErrors, setErrors];
	}
	return [null, null];
};


type ValidationProviderProps = {
	children: JSX.Element,
}

type ValidationField = {
	[formField: string]: boolean
}
type ValidationContextState = {
	[formName: string]: [
		ValidationField,
		React.Dispatch<React.SetStateAction<ValidationField>>
	]
}

export { useValidationContext, ValidationProvider };
