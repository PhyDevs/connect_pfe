import { Navigate  } from 'react-router-dom';
import { isAuthenticated, getUserInfo } from '../../utils/authenticator';


const asAdminOnly = <T extends object>(Component: React.ComponentType<T>) => (props: T)=> {
	const { role } = getUserInfo();

	if (!isAuthenticated()) {
		return <Navigate  to="/login" />;
	}
	if (role !== 'admin') {
		return <Navigate  to="/" />;
	}
	return <Component {...props} />;
};

export default asAdminOnly;
