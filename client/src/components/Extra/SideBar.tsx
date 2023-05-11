import React from 'react';
import styled from '@emotion/styled';
import { useThemeContext } from '../../providers/ThemeContext';
import { useDataContext } from '../../providers/DataContext';
import { useFetch } from '../../utils/use-request';
import colors from '../../utils/colors';
import { User } from '../../models';

const Aside = styled.aside<AsideProps>`
	width: 230px;
	min-width: 230px;
	margin: 0 10px 10px 12px;
	padding: 30px 15px 20px;
	color: ${props => (props.dark ? colors.textDark : colors.textLight)};
	background-color: ${props => (props.dark ? colors.secondDark : colors.light)};
	border-radius: 10px;
	overflow-y: auto;
	box-shadow: ${props =>
		props.dark
			? '0px 1px 2px rgba(210,216,218,0.24), 0px 0px 1px rgba(210,216,218,0.12), 0px -1px 2px rgba(210,216,218,0.15)'
			: '0px 1px 2px rgba(10,16,20,0.24), 0px 0px 1px rgba(10,16,20,0.12), 0px -1px 2px rgba(10,16,20,0.15)'};

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
type AsideProps = {
	dark: boolean
}

const SideBar = React.memo(() => {
	const [isDark] = useThemeContext();
	const {
		state: { currentDepartment },
	} = useDataContext();
	const [{ loading: usersLoading, data: users }, getUsers] = useFetch();

	const fetchUsers = React.useCallback(async () => {
		if (currentDepartment !== undefined) {
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
							{renderUsersList({ users, userRole: "teacher" })}
							{renderUsersList({ users, userRole: "student" })}
						</>
					)
				)}
			</ul>
		</Aside>
	);
});

const renderUsersList = ({ users, userRole }: UsersListProps) =>
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

type UsersListProps = {
	users: Array<User>,
	userRole: string
}

export default SideBar;
