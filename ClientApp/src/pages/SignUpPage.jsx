import React from 'react';
import asPublic from '../components/HOCs/asPublic';
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

export default asPublic(SignUpPage);
