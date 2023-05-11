import React from 'react';
import { useNavigate } from 'react-router-dom';
import Courses from './Courses';
import Departments from './Departments';
import { NavWrapper } from './Elements';
import { useDataContext } from '../../providers/DataContext';
import { useThemeContext } from '../../providers/ThemeContext';
import { useFetch } from '../../utils/use-request';
import { getUserInfo, logout } from '../../utils/authenticator';


const Navigation = React.memo(({ departmentId, uri }: NavigationProps) => {
	const navigate = useNavigate();
	const [isDark] = useThemeContext();
	const {
		state: { user: userName },
		setUser,
		setDepartment,
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
			if (!userName && res) setUser(res.fullName);
			if (res !== null && res.departments.length > 0) {
				const depId = departmentId !== null ? departmentId : res.departments[0].id;
				setDepartment(depId);
				const depRes = await getDepartment(`departments/${depId}`);
				if (depRes === 404) {
					const state = { notFound: true };
					navigate(uri, { state, replace: true });
				}
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [departmentId, getDepartment, getUser, setUser, setDepartment]);

	React.useEffect(() => {
		fetchData();
	}, [fetchData]);

	return (
		<NavWrapper dark={isDark}>
			<Departments loading={depsLoading} departments={!user ? null : user.departments} />
			<Courses
				dark={isDark}
				loading={coursesLoading}
				departmentName={!department ? null : department.name}
				courses={!department ? null : department.courses}
				hasDepartment={!!user && user.departments.length > 0}
			/>
		</NavWrapper>
	);
});


type NavigationProps = {
	departmentId: string,
	uri: string,
};

export default Navigation;
