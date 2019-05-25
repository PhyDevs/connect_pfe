import React from 'react';
import styled from '@emotion/styled';
import { navigate } from '@reach/router';
import { useDataContext } from '../../providers/DataContext';
import { useThemeContext } from '../../providers/ThemeContext';
import { logout } from '../../utils/authenticator';
import colors from '../../utils/colors';

const Top = styled.header`
	display: flex;
	width: calc(100% - 10px);
	margin: 8px 10px 12px 0;
	justify-content: space-between;
	padding: 16px 20px 15px;
	color: ${props => (props.dark ? colors.textDark : colors.textLight)};
	background-color: ${props => (props.dark ? colors.secondDark : colors.light)};
	border-radius: 10px;
	z-index: 8;
	box-shadow: ${props =>
		props.dark
			? '0px 1px 2px rgba(210, 216, 218, 0.24), 0px 0px 1px rgba(210,216,218,0.12)'
			: '0px 1px 2px rgba(10, 16, 20, 0.24), 0px 0px 1px rgba(10, 16, 20, 0.12)'};

	h3 {
		margin: 0;
		font-size: 1.15rem;
	}

	ul {
		margin: 0;
		padding: 0;
		list-style: none;

		li {
			display: inline-block;
		}
	}
`;

const IconButton = styled.button`
	display: inline-block;
	position: relative;
	margin: 0 10px;
	padding: 0;
	width: 20px;
	height: 20px;
	background-color: transparent;
	border: none;
	outline: none;
	border-radius: 50%;
	cursor: pointer;
	transform: scale(1.3);

	&:focus,
	&:active {
		box-shadow: -1px 1px 5px -1px ${colors.main};
	}

	i {
		font-size: 1.25rem;
		color: ${props => (props.dark ? colors.textDark : colors.textLight)};
	}
`;

const Header = () => {
	const {
		state: { currentCourse },
	} = useDataContext();
	const [isDark, toggleDark] = useThemeContext();

	return (
		<Top dark={isDark}>
			<h3>{currentCourse && `Course: ${currentCourse}`}</h3>
			<ul>
				<li>
					<IconButton
						type="button"
						title={`activate ${isDark ? 'light' : 'dark'} mode`}
						dark={isDark}
						onClick={() => {
							toggleDark();
						}}
					>
						<i className="icon-dark" />
					</IconButton>
				</li>
				<li>
					<IconButton type="button" title="settings" dark={isDark}>
						<i className="icon-settings" />
					</IconButton>
				</li>
				<li>
					<IconButton
						type="button"
						title="logout"
						dark={isDark}
						onClick={() => {
							logout();
							navigate('/login');
						}}
					>
						<i className="icon-logout" />
					</IconButton>
				</li>
			</ul>
		</Top>
	);
};

export default Header;
