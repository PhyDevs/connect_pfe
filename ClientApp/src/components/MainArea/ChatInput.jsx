import React from 'react';
import PropTypes from 'prop-types';
import { ChatForm, SendButton } from './Elements';
import { usePost } from '../../utils/use-request';

const ChatInput = ({ courseId, dark, addMessage }) => {
	const [{ loading }, send] = usePost();

	const handelSubmit = async e => {
		e.preventDefault();
		const fromEl = e.target;
		const { message } = fromEl.elements;
		if (!message.value.trim()) return;

		const { data } = await send('messages', {
			content: message.value.trim(),
			courseId,
		});

		if (data) {
			addMessage(data);
			fromEl.reset();
		}
	};

	return (
		<ChatForm dark={dark}>
			<form method="post" onSubmit={handelSubmit}>
				<textarea name="message" placeholder="Write a message..." />
				<SendButton type="submit" value="Send" loading={loading} width="auto" />
			</form>
		</ChatForm>
	);
};

ChatInput.propTypes = {
	courseId: PropTypes.number.isRequired,
	dark: PropTypes.bool.isRequired,
	addMessage: PropTypes.func.isRequired,
};

export default ChatInput;
