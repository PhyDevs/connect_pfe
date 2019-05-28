import React from 'react';
import { MessagesWrapper } from './Elements';
import MessagesList from './MessagesList';
import ChatInput from './ChatInput';
import { useDataContext } from '../../providers/DataContext';
import { useThemeContext } from '../../providers/ThemeContext';
import { useFetch } from '../../utils/use-request';

const Messages = React.memo(() => {
	const {
		state: { currentCourse: course },
	} = useDataContext();
	const [isDark] = useThemeContext();
	const [{ loading }, getCourse] = useFetch();
	const [messages, setMessages] = React.useState(null);

	const fetchData = React.useCallback(async () => {
		if (course !== null) {
			const { data } = await getCourse(`courses/${course.id}/messages`);
			setMessages(data);
		}
	}, [course, getCourse]);

	React.useEffect(() => {
		fetchData();
	}, [fetchData]);

	const AddMessage = React.useCallback(message => {
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
						<MessagesList messages={messages} courseId={course.id} addMessage={AddMessage} />
						<ChatInput courseId={course.id} dark={isDark} addMessage={AddMessage} />
					</>
				)
			)}
		</MessagesWrapper>
	);
});

export default Messages;
