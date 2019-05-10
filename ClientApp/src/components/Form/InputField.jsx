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
		border: 1px solid #cbcbcb;
		outline: 0;
		border-radius: 3px;
		transition: all 0.1s linear;
		z-index: 2;
		&:focus {
			background-color: transparent;
			border-color: #7300ac;
			box-shadow: 0 0 2px 1px #7300ac;
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
`;

const InputField = ({ label, type, name, width }) => {
	const [filled, setFilled] = React.useState(false);

	const HandelFocus = () => {
		if (!filled) setFilled(true);
	};

	const HandelBlur = e => {
		if (e.target.value.trim() !== '') {
			setFilled(true);
		} else {
			e.target.value = '';
			setFilled(false);
		}
	};

	return (
		<Field filled={filled} width={width}>
			<label htmlFor={name}>
				<input type={type} id={name} name={name} onFocus={HandelFocus} onBlur={HandelBlur} />
				<span>{label}</span>
			</label>
		</Field>
	);
};

InputField.propTypes = {
	label: PropTypes.string.isRequired,
	name: PropTypes.string.isRequired,
	type: PropTypes.string,
	width: PropTypes.number,
};

InputField.defaultProps = {
	type: 'text',
	width: 100,
};

export default InputField;
