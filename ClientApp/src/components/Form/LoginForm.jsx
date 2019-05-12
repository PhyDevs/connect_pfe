import React from 'react';
import { Link } from '@reach/router';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import colors from '../../utils/colors';
import InputField from './InputField';
import Button from '../Common/Button';
import { ValidationContext } from '../../providers/ValidationContext';

const Box = styled.div`
	width: 100%;
	max-width: 350px;
	margin: 10px 15px;
	padding: 40px 35px;
	background-color: ${colors.light};
	border-radius: 6px;
	box-shadow: 0 4px 8px rgba(0, 0, 0, 0.12), 0 2px 10px rgba(0, 0, 0, 0.08);

	h1 {
		margin: 0 4px 40px;
		padding: 0;
		text-align: center;
		font-size: 2rem;
		font-weight: 700;
	}
`;

const BottomText = styled.div`
	margin: 30px 0 0;
	text-align: center;

	a {
		color: inherit;
		font-weight: 700;
		text-decoration: none;
	}
`;

const LoginForm = ({ title }) => {
	const { login } = React.useContext(ValidationContext);
	const formRef = React.useRef(null);
	const [hasErrors] = login;

	const HandelSubmit = e => {
		e.preventDefault();
		const errorsArr = Object.values(hasErrors);
		if (errorsArr.indexOf(true) >= 0) {
			if (formRef.current !== null) {
				errorsArr.some((val, key) => {
					if (val) formRef.current.elements[key].focus();
					return val;
				});
			}
			return;
		}

		// Handel Login
		console.log('Passed');
	};

	return (
		<Box>
			<h1>{title}</h1>
			<form ref={formRef} method="post" style={{ padding: '20px 0' }} onSubmit={HandelSubmit}>
				<InputField label="Number" name="number" pattern="^\d{5}$" parentForm="login" />
				<InputField label="Password" name="password" type="password" pattern="^.{4,}$" parentForm="login" />

				<Button type="submit" value="Sign In" />
			</form>

			<BottomText>
				Don&lsquo;t have an account? <Link to="/signup">Sign Up</Link>
			</BottomText>
		</Box>
	);
};

LoginForm.propTypes = {
	title: PropTypes.string,
};

LoginForm.defaultProps = {
	title: 'Sign in',
};

export default LoginForm;
