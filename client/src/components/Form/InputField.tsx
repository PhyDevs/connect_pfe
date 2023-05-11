import React from 'react';
import { Field } from './Elements';
import { useThemeContext } from '../../providers/ThemeContext';
import { useValidationContext } from '../../providers/ValidationContext';


const InputField = ({ name, label, parentForm, type = 'text', pattern = null, errorMsg = 'This value is not valid', width = 100, pr = '0' }: InputFieldProps) => {
	const [filled, setFilled] = React.useState(false);
	const [isValid, setValid] = React.useState(true);
	const [isDark] = useThemeContext();
	const [errors, setErrors] = useValidationContext(parentForm);

	const ValidateValue = (value: string) => {
		if (pattern === null) return true;

		const regex = new RegExp(pattern);
		return regex.test(value);
	};

	const HandelFocus: React.FocusEventHandler<HTMLInputElement> = () => {
		if (!filled) setFilled(true);
	};

	const HandelBlur: React.FocusEventHandler<HTMLInputElement> = e => {
		if (e.target.value !== '') setFilled(true);
		else setFilled(false);

		const validRes = ValidateValue(e.target.value);
		const hasError = errors !== null ? errors[name] : false
		if (validRes && (!isValid || hasError)) {
			setValid(true);
			if (setErrors !== null) setErrors(prev => ({ ...prev, [name]: false }));
		} else if (!validRes && (isValid || !hasError)) {
			setValid(false);
			if (setErrors !== null) setErrors(prev => ({ ...prev, [name]: true }));
		}
	};

	return (
		<Field filled={filled} notValid={!isValid} width={width} pr={pr} dark={isDark}>
			<label htmlFor={name}>
				<input type={type} id={name} name={name} onFocus={HandelFocus} onBlur={HandelBlur} />
				<span>{label}</span>
			</label>
			{!isValid && <span>{errorMsg}</span>}
		</Field>
	);
};

type InputFieldProps = {
	label: string,
	name: string,
	type?: string,
	pattern: string | null,
	parentForm: 'login' | 'signUp' | 'addDepartment',
	errorMsg: string,
	width?: number,
	pr?: string,
};

export default InputField;
