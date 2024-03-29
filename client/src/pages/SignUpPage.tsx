import asPublic from '../components/HOCs/asPublic';
import FlexContainer from '../components/Common/FlexContainer';
import SignUpForm from '../components/Form/SignUpForm';
import { ValidationProvider } from '../providers/ValidationContext';

const SignUpPage = () => {
	document.title = 'Connect App - SignUp';
	return (
		<FlexContainer>
			<ValidationProvider>
				<SignUpForm title='Create your account' />
			</ValidationProvider>
		</FlexContainer>
	);
};

export default asPublic(SignUpPage);
