import React from 'react';
import FlexContainer from '../components/Common/FlexContainer';
import SignUpForm from '../components/Form/SignUpForm';
import { ValidationProvider } from '../providers/ValidationContext';

const SignUpPage = () => (
	<FlexContainer>
		<ValidationProvider>
			<SignUpForm />
		</ValidationProvider>
	</FlexContainer>
);

export default SignUpPage;
