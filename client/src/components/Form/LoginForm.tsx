import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import InputField from './InputField';
import Button from '../Common/Button';
import { Box, BottomText, FormError } from './Elements';
import { useThemeContext } from '../../providers/ThemeContext';
import { useValidationContext } from '../../providers/ValidationContext';
import { usePost } from '../../utils/use-request';
import { authenticate } from '../../utils/authenticator';


const LoginForm = ({ title }: LoginFormProps) => {
	const navigate = useNavigate();
	const [isDark] = useThemeContext();
	const [hasErrors] = useValidationContext('login');
	const [{ loading, errors }, send] = usePost();

	const HandelSubmit: React.FormEventHandler<HTMLFormElement> = async e => {
		e.preventDefault();
		const formRef = e.target as HTMLFormElement;
		const errorsArr = hasErrors !== null ? Object.values(hasErrors) : [];
		if (errorsArr.indexOf(true) >= 0 && formRef.elements.length > 0) {
			errorsArr.some((val, key) => {
				if (val) (formRef.elements[key] as HTMLInputElement).focus();
				return val;
			});
			return;
		}

		const [number, password] = formRef.elements;
		const { data } = await send('login', {
			NInscription: (number as HTMLInputElement).value,
			password: (password as HTMLInputElement).value,
		});

		if (data !== null) {
			authenticate(data);
			navigate('/');
		}
	};

	return (
		<Box width="350px" padding="40px 35px" dark={isDark}>
			<h1>{title || 'Sign in'}</h1>
			<form method="post" style={{ padding: '20px 0 0' }} onSubmit={HandelSubmit}>
				<InputField
					label="Number"
					name="number"
					pattern="^\d{5}$"
					errorMsg="Use a number between 10000 and 99999"
					parentForm="login"
				/>
				<InputField
					label="Password"
					name="password"
					type="password"
					pattern="^.{4,}$"
					errorMsg="Use 4 characters or more"
					parentForm="login"
				/>
				<Button type="submit" value="Sign In" loading={loading} />
			</form>

			{!!errors && (
				<FormError success={false}>
					<span>{errors.error || 'Error on submiting'}</span>
				</FormError>
			)}

			<BottomText dark={isDark} style={{ margin: '30px 0 0', textAlign: 'center' }}>
				Don&lsquo;t have an account? <Link to="/signup">Sign Up</Link>
			</BottomText>
		</Box>
	);
};

type LoginFormProps = {
	title: string,
};


export default LoginForm;
