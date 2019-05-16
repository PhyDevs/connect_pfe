import React from 'react';
import PropTypes from 'prop-types';
import { Field } from './Elements';
import { useValidationContext } from '../../providers/ValidationContext';

const InputField = ({ label, type, name, pattern, parentForm, errorMsg, width, pr }) => {
	const [filled, setFilled] = React.useState(false);
	const [isValid, setValid] = React.useState(true);
	const [errors, setErrors] = useValidationContext(parentForm);

	const ValidateValue = value => {
		if (pattern === null) return true;

		const regex = new RegExp(pattern);
		return regex.test(value);
	};

	const HandelFocus = () => {
		if (!filled) setFilled(true);
	};

	const HandelBlur = e => {
		if (e.target.value !== '') setFilled(true);
		else setFilled(false);

		const validRes = ValidateValue(e.target.value);
		if (validRes && (!isValid || errors[name])) {
			setValid(true);
			setErrors(prev => ({ ...prev, [name]: false }));
		} else if (!validRes && (isValid || !errors[name])) {
			setValid(false);
			setErrors(prev => ({ ...prev, [name]: true }));
		}
	};

	return (
		<Field filled={filled} notValid={!isValid} width={width} pr={pr}>
			<label htmlFor={name}>
				<input type={type} id={name} name={name} onFocus={HandelFocus} onBlur={HandelBlur} />
				<span>{label}</span>
			</label>
			{!isValid && <span>{errorMsg}</span>}
		</Field>
	);
};

InputField.propTypes = {
	label: PropTypes.string.isRequired,
	name: PropTypes.string.isRequired,
	type: PropTypes.string,
	pattern: PropTypes.string,
	parentForm: PropTypes.oneOf(['login', 'signUp']).isRequired,
	errorMsg: PropTypes.string,
	width: PropTypes.number,
	pr: PropTypes.string,
};

InputField.defaultProps = {
	type: 'text',
	pattern: null,
	errorMsg: 'This value is not valid',
	width: 100,
	pr: '0',
};

export default InputField;
