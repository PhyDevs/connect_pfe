import { Navigate  } from 'react-router-dom';
import { isAuthenticated } from '../../utils/authenticator';


const asPublic = <T extends object>(Component: React.ComponentType<T>) => (props: T) => {
	if (isAuthenticated()) {
		return <Navigate  to="/" />;
	}
	return <Component {...props} />;
};

export default asPublic;
