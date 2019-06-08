import styled from '@emotion/styled';
import Button from '../Common/Button';
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
		background-color: ${colors.main};
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

export const CustomOuterList = styled.div`
	position: relative;
	padding: 0;
	margin: 10px 0;
	overflow-y: auto;
`;

export const CustomInnerList = styled.ul`
	display: flex;
	width: calc(100% - 10px);
	padding: 5px 10px 20px;
	margin: 0 5px;
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

export const ChatForm = styled.div`
	width: calc(100% - 40px);
	margin: 0 20px 30px;
	padding: 30px 10px 0;
	border-top: 1px solid #cfcfcf;

	form {
		position: relative;

		textarea {
			width: 100%;
			padding: 15px 120px 15px 30px;
			color: ${props => (props.dark ? colors.textDark : colors.textLight)};
			background-color: ${props => (props.dark ? colors.dark : colors.secondLight)};
			line-height: 1.3rem;
			border: none;
			outline: none;
			border-radius: 10px;
			resize: none;
		}
	}
`;

export const SendButton = styled(Button)`
	display: block;
	position: absolute;
	top: 14px;
	right: 15px;
	margin: 0;
`;
