import React from 'react';
import styled from '@emotion/styled';
import { navigate } from '@reach/router';
import { useDataContext } from '../../providers/DataContext';
import { useThemeContext } from '../../providers/ThemeContext';
import { logout } from '../../utils/authenticator';
import colors from '../../utils/colors';

const Top = styled.header`
	display: flex;
	justify-content: space-between;
	width: 100%;
	padding: 16px 20px 15px;
	color: ${props => (props.dark ? colors.textDark : colors.textLight)};
	border-bottom: 1px solid;
	border-color: ${props => (props.dark ? '#5b5b5b' : '#c7c7c7')};
	background-color: ${props => (props.dark ? colors.secondDark : colors.secondLight)};
	z-index: 8;

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
						dark={isDark}
						onClick={() => {
							toggleDark();
						}}
					>
						<i className="icon-dark" />
					</IconButton>
				</li>
				<li>
					<IconButton type="button" dark={isDark}>
						<i className="icon-settings" />
					</IconButton>
				</li>
				<li>
					<IconButton
						type="button"
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
