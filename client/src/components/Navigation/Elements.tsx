import styled from '@emotion/styled';
import colors from '../../utils/colors';

export const NavWrapper = styled.div<NavWrapperProps>`
	position: relative;
	min-width: 300px;
	margin: 8px 12px 10px 10px;
	background-color: ${props => (props.dark ? colors.secondDark : colors.light)};
	border-radius: 10px;
	overflow-x: hidden;
	overflow-y: auto;
	box-shadow: ${props =>
		props.dark
			? '0px 1px 2px rgba(210,216,218,0.24), 0px 0px 1px rgba(210,216,218,0.12), 0px -1px 2px rgba(210,216,218,0.15)'
			: '0px 1px 2px rgba(10,16,20,0.24), 0px 0px 1px rgba(10,16,20,0.12), 0px -1px 2px rgba(10,16,20,0.15)'};
`;
type NavWrapperProps = {
	dark: boolean
}

export const DepartmentsList = styled.nav`
	position: absolute;
	top: 0;
	left: 0;
	height: 100%;
	width: 70px;
	min-height: fit-content;
	padding: 20px 10px;
	background-color: ${colors.main};
	box-shadow: 2px 0 4px -2px rgba(0, 0, 0, 0.5);
	z-index: 5;

	ul {
		margin: 0;
		padding: 0;
		list-style: none;
		color: ${colors.textDark};
		li {
			position: relative;

			a,
			button {
				display: block;
				width: 50px;
				height: 50px;
				margin: 0 0 20px;
				text-transform: uppercase;
				background-color: ${colors.light};
				color: ${colors.textLight};
				text-align: center;
				line-height: 50px;
				font-size: 20px;
				font-weight: 700;
				text-decoration: none;
				overflow: hidden;
				border-radius: 8px;
				box-shadow: 0 2px 6px -2px rgba(0, 0, 0, 0.4);
				text-shadow: 0 4px 4px rgba(0, 0, 0, 0.2);

				&.logo {
					background-color: transparent;
				}
				img {
					max-width: 100%;
				}
			}

			button {
				font-size: 40px;
				line-height: 40px;
				background-color: transparent;
				color: #fafafa;
				border: 3px solid #fafafa;
				cursor: pointer;
			}
		}
	}
`;

export const CoursesList = styled.nav<CoursesListProps>`
	position: absolute;
	top: 0;
	left: 70px;
	height: 100%;
	width: 230px;
	min-height: fit-content;
	min-width: 230px;
	padding: 35px 15px 20px;
	color: ${props => (props.dark ? colors.textDark : colors.textLight)};
	background-color: ${props => (props.dark ? colors.secondDark : colors.light)};

	h4 {
		display: block;
		margin: 0 0 18px;
		padding: 4px;
		font-size: 1.16rem;
		font-weight: 700;
		text-transform: capitalize;
		text-decoration: underline;
		color: inherit;
		letter-spacing: 0.3px;
	}

	ul {
		margin: 0;
		padding: 0;
		list-style: none;

		a {
			display: block;
			margin: 0 0 8px;
			padding: 6px 4px;
			font-size: 1.03rem;
			letter-spacing: 0.3px;
			font-weight: 700;
			color: inherit;
			text-decoration: none;
			line-height: 1.5rem;

			&:before {
				content: '#';
				display: inline-block;
				font-size: 1.6rem;
				margin-right: 6px;
				transform: translateY(0.2rem);
			}
		}

		& li > button {
			display: block;
			width: 100%;
			margin: 0 0 8px;
			padding: 6px 4px;
			font-size: 1.03rem;
			text-align: left;
			letter-spacing: 0.3px;
			font-weight: 700;
			line-height: 1.5rem;
			color: inherit;
			cursor: pointer;
			background-color: transparent;
			border: none;

			&:before {
				content: '+';
				display: inline-block;
				font-size: 1.6rem;
				margin-right: 6px;
				transform: translateY(0.2rem);
			}
		}
	}
`;
type CoursesListProps = {
	dark: boolean
}

export const Separator = styled.div`
	display: block;
	width: 100%;
	height: 2px;
	margin: 0 0 25px;
	border-radius: 2px;
	background-color: #fafafa;
`;

export const Tooltip = styled.div`
	position: absolute;
	display: block;
	width: 150px;
	padding: 5px 8px;
	left: calc(100% + 18px);
	top: 11px;
	font-size: 14px;
	background-color: #858585;
	letter-spacing: 0.2px;
	color: #fff;
	border-radius: 4px;
	box-shadow: 0 4px 4px -2px rgba(0, 0, 0, 0.2);

	&:before {
		content: '';
		position: absolute;
		border: 8px solid transparent;
		top: calc(50% - 9px);
		border-left-width: 0;
		border-right-color: #858585;
		left: -6px;
		z-index: 8;
	}
`;
