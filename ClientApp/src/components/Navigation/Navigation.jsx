import React from 'react';
import { navigate } from '@reach/router';
import PropTypes from 'prop-types';
import Courses from './Courses';
import Departments from './Departments';
import { useThemeContext } from '../../providers/ThemeContext';
import { useFetch } from '../../utils/use-request';
import { getUserInfo, logout } from '../../utils/authenticator';

const Navigation = React.memo(({ departmentId }) => {
	const [isDark] = useThemeContext();
	const [{ loading: depsLoading, data: user }, getUser] = useFetch();
	const [{ loading: coursesLoading, data: department }, getDepartment] = useFetch();

	const fetchData = React.useCallback(async () => {
		const { id } = getUserInfo();
		if (!id) {
			logout();
			navigate('/login');
		} else {
			const { data: res } = await getUser(`users/${id}`);
			if (res !== null) {
				const depId = departmentId !== null ? departmentId : res.departments[0].id;
				getDepartment(`departments/${depId}`);
			}
		}
	}, [departmentId, getDepartment, getUser]);

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
			/>
		</div>
	);
});

Navigation.propTypes = {
	departmentId: PropTypes.string,
};

Navigation.defaultProps = {
	departmentId: null,
};

export default Navigation;
