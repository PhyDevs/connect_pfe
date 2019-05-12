import React from 'react';
import FlexContainer from '../components/Common/FlexContainer';
import LoginForm from '../components/Form/LoginForm';
import { ValidationProvider } from '../providers/ValidationContext';

const LoginPage = () => (
	<FlexContainer>
		<ValidationProvider>
			<LoginForm title="Welcome" />
		</ValidationProvider>
	</FlexContainer>
);

export default LoginPage;
