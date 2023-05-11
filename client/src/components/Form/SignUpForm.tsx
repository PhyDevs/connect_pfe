import { Link, useNavigate } from 'react-router-dom';
import InputField from './InputField';
import Button from '../Common/Button';
import { Box, BottomText, FormError } from './Elements';
import { useThemeContext } from '../../providers/ThemeContext';
import { useValidationContext } from '../../providers/ValidationContext';
import { usePost } from '../../utils/use-request';
import { authenticate } from '../../utils/authenticator';


const SignUpForm = ({ title }: SignUpFormProps) => {
	const navigate = useNavigate();
	const [isDark] = useThemeContext();
	const [hasErrors] = useValidationContext('signUp');
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

		const [firstname, lastname, number, password] = formRef.elements;
		const { data } = await send('register', {
			firstname: (firstname as HTMLInputElement).value,
			lastname: (lastname as HTMLInputElement).value,
			NInscription: (number as HTMLInputElement).value,
			password: (password as HTMLInputElement).value,
		});

		if (data !== null) {
			authenticate(data);
			navigate('/');
		}
	};

	return (
		<Box width="500px" padding="40px 35px 26px" dark={isDark}>
			<h1>{title || 'Register'}</h1>
			<form method="post" style={{ padding: '20px 0 0' }} onSubmit={HandelSubmit}>
				<InputField
					label="First name"
					name="firstName"
					pattern="^.{3,}$"
					errorMsg="Use 3 characters or more"
					parentForm="signUp"
					width={52}
					pr="4%"
				/>
				<InputField
					label="Last name"
					name="lastName"
					pattern="^.{3,}$"
					errorMsg="Use 3 characters or more"
					parentForm="signUp"
					width={48}
				/>
				<InputField
					label="Number"
					name="number"
					pattern="^\d{5}$"
					errorMsg="Use a number between 10000 and 99999"
					parentForm="signUp"
				/>
				<InputField
					label="Password"
					name="password"
					type="password"
					pattern="^.{4,}$"
					errorMsg="Use 4 characters or more"
					parentForm="signUp"
				/>

				<Button type="submit" value="Sign Up" width="auto" loading={loading} />

				<BottomText dark={isDark} style={{ float: 'right', margin: '16px 0 0' }}>
					<Link to="/login">Sign in instead</Link>
				</BottomText>

				{!!errors && (
					<FormError success={false}>
						<span>
							{errors.error ||
								(!!errors[Object.keys(errors)[0]] && errors[Object.keys(errors)[0]][0]) ||
								'Error on submiting'}
						</span>
					</FormError>
				)}
			</form>
		</Box>
	);
};

type SignUpFormProps = {
	title: string,
};

export default SignUpForm;
