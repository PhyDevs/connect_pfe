import React from 'react';
import { ChatForm, SendButton } from './Elements';
import { usePost } from '../../utils/use-request';

const ChatInput = ({ courseId, dark, addMessage }: ChatInputProps) => {
	const [{ loading }, send] = usePost();

	const handelSubmit : React.FormEventHandler<HTMLFormElement> = async e => {
		e.preventDefault();
		const fromEl = e.target as HTMLFormElement;
		const message = fromEl.elements.namedItem('message') as HTMLTextAreaElement;
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

type ChatInputProps = {
	courseId: number,
	dark: boolean,
	addMessage: Function,
};

export default ChatInput;
