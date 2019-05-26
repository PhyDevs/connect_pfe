import React from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import Button from '../Common/Button';
import colors from '../../utils/colors';

const ChatForm = styled.div`
	width: calc(100% - 40px);
	margin: 0 20px 30px;
	padding: 30px 10px 0;
	border-top: 1px solid #cfcfcf;

	form {
		position: relative;

		textarea {
			width: 100%;
			padding: 15px 105px 15px 30px;
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

const SendBtn = styled(Button)`
	display: block;
	position: absolute;
	top: 14px;
	right: 15px;
	margin: 0;
`;

const ChatInput = ({ dark }) => {
	return (
		<ChatForm dark={dark}>
			<form method="post">
				<textarea name="message" placeholder="Write a message..." />
				<SendBtn type="submit" value="Send" width="auto" />
			</form>
		</ChatForm>
	);
};

ChatInput.propTypes = {
	dark: PropTypes.bool.isRequired,
};

export default ChatInput;
