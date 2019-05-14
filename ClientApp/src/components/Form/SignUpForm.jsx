import React from 'react';
import { Link } from '@reach/router';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import InputField from './InputField';
import Button from '../Common/Button';
import { useValidationContext } from '../../providers/ValidationContext';
import colors from '../../utils/colors';

const Box = styled.div`
	width: 100%;
	max-width: 500px;
	margin: 10px 15px;
	padding: 40px 35px 26px;
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
	float: right;
	margin: 16px 0 0;

	a {
		color: inherit;
		font-weight: 700;
		text-decoration: none;
	}
`;

const SignUpForm = ({ title }) => {
	const [hasErrors] = useValidationContext('signUp');

	const HandelSubmit = e => {
		e.preventDefault();
		const errorsArr = Object.values(hasErrors);
		const formRef = e.target;
		if (errorsArr.indexOf(true) >= 0 && formRef.elements.length > 0) {
			errorsArr.some((val, key) => {
				if (val) formRef.elements[key].focus();
				return val;
			});

			return;
		}

		// Handel Sign Up
		console.log('Passed');
	};

	return (
		<Box>
			<h1>{title}</h1>
			<form method="post" style={{ padding: '20px 0 0' }} onSubmit={HandelSubmit}>
				<InputField label="First name" name="firstName" pattern="^.{2,}$" parentForm="signUp" width={52} pr="4%" />
				<InputField label="Last name" name="lastName" pattern="^.{2,}$" parentForm="signUp" width={48} />
				<InputField label="Number" name="number" pattern="^\d{5}$" parentForm="signUp" />
				<InputField label="Password" name="password" type="password" pattern="^.{4,}$" parentForm="signUp" />

				<Button type="submit" value="Sign Up" width="auto" />

				<BottomText>
					<Link to="/login">Sign in instead</Link>
				</BottomText>
			</form>
		</Box>
	);
};

SignUpForm.propTypes = {
	title: PropTypes.string,
};

SignUpForm.defaultProps = {
	title: 'Create your account',
};

export default SignUpForm;
