import React from 'react';
import { navigate } from '@reach/router';
import PropTypes from 'prop-types';
import Welcome from './Welcome';
import Messages from './Messages';
import Header from '../Extra/Header';
import SideBar from '../Extra/SideBar';
import { useDataContext } from '../../providers/DataContext';
import { useFetch } from '../../utils/use-request';

const MainArea = ({ courseId, uri }) => {
	const {
		state: { currentCourse: course },
		setCourse,
	} = useDataContext();
	const [, getCourse] = useFetch();

	const fetchData = React.useCallback(async () => {
		if (courseId !== null) {
			const res = await getCourse(`courses/${courseId}`);
			if (res === 404) {
				const state = { notFound: true };
				navigate(uri, { state, replace: true });
			} else if (res.data !== null) {
				setCourse({ id: res.data.id, name: res.data.name });
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [courseId, getCourse, setCourse]);

	React.useEffect(() => {
		fetchData();
	}, [fetchData]);

	return (
		<main style={{ flexGrow: 1 }}>
			<Header />
			<div style={{ display: 'flex', height: 'calc(100% - 72px)' }}>
				{!courseId && !course ? <Welcome /> : <Messages />}
				<SideBar />
			</div>
		</main>
	);
};

MainArea.propTypes = {
	courseId: PropTypes.string,
	uri: PropTypes.string,
};

MainArea.defaultProps = {
	courseId: null,
	uri: null,
};

export default MainArea;
