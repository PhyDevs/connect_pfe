import styled from '@emotion/styled';
import colors from '../../utils/colors';

export const WelcomeWrapper = styled.section`
	display: flex;
	margin: 0;
	margin-bottom: 10px;
	flex-grow: 1;
	justify-content: center;
	align-items: center;
	background-color: ${props => (props.dark ? colors.secondDark : colors.light)};
	border-radius: 10px;
	overflow: hidden;
	box-shadow: ${props =>
		props.dark
			? '0px 1px 2px rgba(210,216,218,0.24), 0px 0px 1px rgba(210,216,218,0.12), 0px -1px 2px rgba(210,216,218,0.15)'
			: '0px 1px 2px rgba(10,16,20,0.24), 0px 0px 1px rgba(10,16,20,0.12), 0px -1px 2px rgba(10,16,20,0.15)'};
`;

export const MessagesWrapper = styled.section`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	position: relative;
	margin: 0;
	margin-bottom: 10px;
	flex-grow: 1;
	background-color: ${props => (props.dark ? colors.secondDark : colors.light)};
	border-radius: 10px;
	overflow: hidden;
	box-shadow: ${props =>
		props.dark
			? '0px 1px 2px rgba(210,216,218,0.24), 0px 0px 1px rgba(210,216,218,0.12), 0px -1px 2px rgba(210,216,218,0.15)'
			: '0px 1px 2px rgba(10,16,20,0.24), 0px 0px 1px rgba(10,16,20,0.12), 0px -1px 2px rgba(10,16,20,0.15)'};
`;

export const BigTitle = styled.div`
	margin-top: -50px;
	text-align: center;
	h1 {
		margin-bottom: 10px;
		font-size: 4.5rem;
		text-transform: capitalize;
		color: ${props => (props.dark ? colors.textDark : colors.textLight)};
	}
	h3 {
		position: relative;
		margin: 0;
		font-size: 2.3rem;
		color: #fafafa;
		background-color: #7300ac;
		overflow: hidden;

		&:after,
		&:before {
			content: '';
			background-color: ${props => (props.dark ? colors.secondDark : colors.light)};
			position: absolute;
			width: 15%;
			height: 220%;
			z-index: 2;
			transform: rotateZ(-30deg);
		}
		&:before {
			top: -70%;
			left: -15px;
		}
		&:after {
			top: -50%;
			right: -15px;
		}
	}
`;

export const CustomList = styled.ul`
	display: flex;
	position: relative;
	width: calc(100% - 10px);
	margin: 15px 5px;
	padding: 20px 10px;
	overflow-y: scroll;
	flex-direction: column-reverse;
	list-style: none;
`;

export const MessageEmpty = styled.li`
	width: 100%;
	text-align: center;
	margin: 0;
	font-size: 1.1rem;
`;

export const MessageItem = styled.li`
	display: flex;
	position: relative;
	margin: 50px 0 0;

	i {
		display: inline-block;
		height: 44px;
		margin: 0 20px 0 10px;
		padding: 10px 10px;
		font-size: 1.5rem;
		color: #fafafa;
		background-color: ${colors.main};
		border-radius: 8px;
		box-shadow: 0 2px 6px -2px rgba(0, 0, 0, 0.4);
	}

	.date-sep {
		font-size: 0.9rem;
		position: absolute;
		top: -25px;
		left: 50%;
		padding: 0 15px;
		background-color: ${props => (props.dark ? colors.secondDark : colors.light)};
		letter-spacing: 0.6px;
		transform: translate(-50%, -50%);
	}

	.meta-data {
		font-weight: 700;
		font-size: 1.16rem;

		span {
			margin-left: 6px;
			font-weight: 300;
			font-size: 0.8rem;
		}
	}

	.content {
		margin-top: 10px;
		font-size: 1.1rem;
	}

	&:before {
		content: '';
		position: absolute;
		width: 100%;
		height: 1px;
		top: -26px;
		left: 0;
		background-color: #cfcfcf;
	}
`;
