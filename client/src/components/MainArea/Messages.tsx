import React from 'react';
import { MessagesWrapper } from './Elements';
import MessagesList from './MessagesList';
import ChatInput from './ChatInput';
import { useDataContext } from '../../providers/DataContext';
import { useThemeContext } from '../../providers/ThemeContext';
import { useFetch } from '../../utils/use-request';
import { Message } from '../../models';

const Messages = React.memo(() => {
	const {
		state: { currentCourse: course },
	} = useDataContext();
	const [isDark] = useThemeContext();
	const [{ loading }, getCourse] = useFetch();
	const [messages, setMessages] = React.useState<Message[]>([]);

	const fetchData = React.useCallback(async () => {
		if (course !== undefined && course !== null) {
			const { data } = await getCourse(`courses/${course.id}/messages`, false);
			setMessages(data);
		}
	}, [course, getCourse]);

	React.useEffect(() => {
		fetchData();
	}, [fetchData]);

	const AddMessage = React.useCallback((message: Message) => {
		if (Array.isArray(message)) {
			setMessages(prevMessages => [...prevMessages, ...message]);
		} else {
			setMessages(prevMessages => [message, ...prevMessages]);
		}
	}, []);

	return (
		<MessagesWrapper dark={isDark}>
			{loading ? (
				<div className="loading-con" />
			) : (
				messages && (
					<>
						<MessagesList messages={messages} courseId={course?.id || 0} addMessage={AddMessage} />
						<ChatInput courseId={course?.id || 0} dark={isDark} addMessage={AddMessage} />
					</>
				)
			)}
		</MessagesWrapper>
	);
});

export default Messages;
