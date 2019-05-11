import React from 'react';
import FlexContainer from '../components/Common/FlexContainer';
import LoginForm from '../components/Form/LoginForm';
import { LoginProvider } from '../providers/LoginContext';

const LoginPage = () => (
	<LoginProvider>
		<FlexContainer>
			<LoginForm title="Welcome" />
		</FlexContainer>
	</LoginProvider>
);

export default LoginPage;
