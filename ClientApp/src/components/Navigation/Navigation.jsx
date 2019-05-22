import React from 'react';
import { navigate } from '@reach/router';
import PropTypes from 'prop-types';
import Courses from './Courses';
import Departments from './Departments';
import { useDataContext } from '../../providers/DataContext';
import { useThemeContext } from '../../providers/ThemeContext';
import { useFetch } from '../../utils/use-request';
import { getUserInfo, logout } from '../../utils/authenticator';

const Navigation = React.memo(({ departmentId, uri }) => {
	const [isDark] = useThemeContext();
	const {
		state: { user: userName },
		setUser,
	} = useDataContext();
	const [{ loading: depsLoading, data: user }, getUser] = useFetch();
	const [{ loading: coursesLoading, data: department }, getDepartment] = useFetch();

	const fetchData = React.useCallback(async () => {
		const { id } = getUserInfo();
		if (!id) {
			logout();
			navigate('/login');
		} else {
			const { data: res } = await getUser(`users/${id}`);
			if (res !== null && res.departments.length > 0) {
				if (!userName) {
					setUser(res.fullName);
				}
				const depId = departmentId !== null ? departmentId : res.departments[0].id;
				const depRes = await getDepartment(`departments/${depId}`);
				if (depRes === 404) {
					const state = { notFound: true };
					navigate(uri, { state, replace: true });
				}
			}
		}
	}, [departmentId, getDepartment, getUser, setUser, uri, userName]);

	React.useEffect(() => {
		fetchData();
	}, [fetchData]);

	return (
		<div style={{ display: 'flex' }}>
			<Departments loading={depsLoading} departments={!user ? null : user.departments} />
			<Courses
				dark={isDark}
				loading={coursesLoading}
				departmentName={!department ? null : department.name}
				courses={!department ? null : department.courses}
				hasDepartment={!!user && user.departments.length > 0}
			/>
		</div>
	);
});

Navigation.propTypes = {
	departmentId: PropTypes.string,
	uri: PropTypes.string,
};

Navigation.defaultProps = {
	departmentId: null,
	uri: null,
};

export default Navigation;
