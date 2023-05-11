import { Navigate  } from 'react-router-dom';
import { isAuthenticated } from '../../utils/authenticator';


const asPrivate = <T extends object>(Component: React.ComponentType<T>) => (props: T) => {
	if (!isAuthenticated()) {
		return <Navigate  to="/login" />;
	}
	return <Component {...props} />;
};

export default asPrivate;
