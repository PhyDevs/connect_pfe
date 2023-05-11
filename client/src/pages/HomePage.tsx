import { useLocation, useParams } from 'react-router-dom';
import NotFound from './NotFound';
import asPrivate from '../components/HOCs/asPrivate';
import { DataProvider } from '../providers/DataContext';
import Navigation from '../components/Navigation/Navigation';
import MainArea from '../components/MainArea/index';


const Home = ({}: HomeProps) => {
	document.title = 'Connect App - Home';

	let location = useLocation();
	let { departmentId, courseId, uri } = useParams()
	console.log(departmentId, courseId, uri);
	
	return location.state && location.state.notFound ? (
		<NotFound />
	) : (
		<DataProvider>
			<div style={{ display: 'flex', height: '100vh' }}>
				<Navigation uri={uri || ''} departmentId={departmentId || ''} />
				<MainArea uri={uri || ''} courseId={courseId || ''} />
			</div>
		</DataProvider>
	);
};

type HomeProps = {};

export default asPrivate(Home);
