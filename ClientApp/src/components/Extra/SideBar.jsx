import React from 'react';
import styled from '@emotion/styled';
import { useThemeContext } from '../../providers/ThemeContext';
import { useDataContext } from '../../providers/DataContext';
import { useFetch } from '../../utils/use-request';
import colors from '../../utils/colors';

const Aside = styled.aside`
	width: 220px;
	margin: 0 6px 4px 4px;
	padding: 30px 15px 20px;
	color: ${props => (props.dark ? colors.textDark : colors.textLight)};
	background-color: ${props => (props.dark ? colors.secondDark : colors.secondLight)};
	border: 1px solid;
	border-color: ${props => (props.dark ? '#282828' : '#e6e6e6')};
	border-radius: 10px;

	ul {
		padding: 0;
		margin: 0;
		list-style: none;

		li {
			font-size: 1.12rem;
			padding: 10px 0 6px 6px;
			letter-spacing: 0.03rem;

			i {
				display: inline-block;
				margin-right: 3px;
				padding: 2px 5px;
				color: #fafafa;
				background-color: ${colors.main};
				font-size: 1.5rem;
				border-radius: 8px;
				box-shadow: 0 2px 5px -2px rgba(0, 0, 0, 0.4);
			}
		}
	}
`;

const SideBar = React.memo(() => {
	const [isDark] = useThemeContext();
	const {
		state: { currentDepartment },
	} = useDataContext();
	const [{ loading: usersLoading, data: users }, getUsers] = useFetch();

	const fetchUsers = React.useCallback(async () => {
		if (currentDepartment !== null) {
			getUsers(`departments/${currentDepartment}/users`);
		}
	}, [currentDepartment, getUsers]);

	React.useEffect(() => {
		fetchUsers();
	}, [fetchUsers]);

	return (
		<Aside dark={isDark}>
			<ul>
				{usersLoading ? (
					<li>Loading ...</li>
				) : (
					!!users && (
						<>
							<UsersList users={users} userRole="teacher" />
							<UsersList users={users} userRole="student" />
						</>
					)
				)}
			</ul>
		</Aside>
	);
});

const UsersList = ({ users, userRole }) =>
	users
		.filter(user => user.role === userRole)
		.map((user, index) => {
			return index === 0 ? (
				<React.Fragment key={user.id}>
					<li style={{ textTransform: 'capitalize', marginTop: '10px', fontWeight: 700 }}>{`${userRole}s :`}</li>
					<li>
						<i className="icon-user" /> {user.fullName}
					</li>
				</React.Fragment>
			) : (
				<li key={user.id}>
					<i className="icon-user" /> {user.fullName}
				</li>
			);
		});

export default SideBar;
