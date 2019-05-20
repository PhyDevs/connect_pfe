import styled from '@emotion/styled';
import colors from '../../utils/colors';

export const DepartmentsList = styled.nav`
	height: 100vh;
	width: 70px;
	min-height: 100%;
	padding: 20px 10px;
	background-color: ${colors.main};
	box-shadow: 2px 0 6px -2px rgba(0, 0, 0, 0.5);
	z-index: 5;

	ul {
		margin: 0;
		padding: 0;
		list-style: none;
		color: ${colors.textDark};
		li {
			position: relative;

			a {
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
		}
	}
`;

export const CoursesList = styled.nav`
	height: 100vh;
	width: 230px;
	min-height: 460px;
	overflow: auto;
	padding: 35px 15px 20px;
	color: ${props => (props.dark ? colors.textDark : colors.textLight)};
	background-color: ${props => (props.dark ? colors.secondDark : colors.secondLight)};

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
			margin: 0 0 10px;
			padding: 4px;
			font-size: 1.03rem;
			letter-spacing: 0.3px;
			font-weight: 700;
			color: inherit;
			text-decoration: none;
		}
	}
`;

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
