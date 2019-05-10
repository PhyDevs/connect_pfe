import React from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';

const Field = styled.div`
	position: relative;
	width: ${props => (props.width ? `${props.width}%` : '100%')};
	display: ${props => (props.width === 100 ? `block` : 'inline-block')};
	padding: ${props => (props.width === 100 ? 0 : '0 5px')};
	margin: 15px 0 25px;

	input {
		position: relative;
		width: 100%;
		font-size: 1.12rem;
		padding: 8px 10px;
		background-color: transparent;
		border: 1px solid;
		border-color: ${props => (props.notValid ? '#ea1000' : '#cbcbcb')};
		outline: 0;
		border-radius: 3px;
		transition: all 0.1s linear;
		z-index: 2;
		&:focus {
			background-color: transparent;
			border-color: ${props => (props.notValid ? '#ea1000' : '#7300ac')};
			box-shadow: 0 0 2px 1px ${props => (props.notValid ? '#ea1000' : '#7300ac')};
		}

		& + span {
			position: absolute;
			padding: 2px 8px;
			background-color: #ffffff;
			top: ${props => (props.filled ? '-12px' : '8px')};
			left: ${props => (props.filled ? '0' : '4px')};
			color: ${props => (props.filled ? '#7300ac' : '#434343')};
			transform: ${props => (props.filled ? 'scale(0.8)' : 'scale(1)')};
			z-index: ${props => (props.filled ? 3 : 0)};
			transition: all 0.1s linear;
		}
	}

	& > span {
		display: inline-block;
		margin: 5px 4px 0;
		color: #ea1000;
		font-weight: 700;
		font-size: 0.9rem;
		letter-spacing: 0.2px;
	}
`;

const InputField = ({ label, type, name, pattern, errorMsg, width }) => {
	const [filled, setFilled] = React.useState(false);
	const [isValid, setValid] = React.useState(true);

	const ValidateValue = value => {
		if (pattern === null) return true;

		const regex = new RegExp(pattern);
		return regex.test(value);
	};

	const HandelFocus = () => {
		if (!filled) setFilled(true);
	};

	const HandelBlur = e => {
		if (e.target.value.trim() !== '') {
			setFilled(true);

			if (ValidateValue(e.target.value)) setValid(true);
			else setValid(false);
		} else {
			e.target.value = '';
			setFilled(false);
		}
	};

	return (
		<Field filled={filled} notValid={!isValid} width={width}>
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
	errorMsg: PropTypes.string,
	width: PropTypes.number,
};

InputField.defaultProps = {
	type: 'text',
	pattern: null,
	errorMsg: 'This value is not valid',
	width: 100,
};

export default InputField;
