import React from 'react';
import asPublic from '../components/HOCs/asPublic';
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

export default asPublic(LoginPage);
