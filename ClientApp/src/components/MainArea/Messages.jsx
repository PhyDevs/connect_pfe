import React from 'react';
import { MessagesWrapper, CustomList, MessageItem, MessageEmpty } from './Elements';
import ChatInput from './ChatInput';
import { useDataContext } from '../../providers/DataContext';
import { useThemeContext } from '../../providers/ThemeContext';
import { useFetch } from '../../utils/use-request';

const Messages = React.memo(() => {
	const {
		state: { currentCourse: course },
	} = useDataContext();
	const [{ loading, data: messages }, getCourse] = useFetch();
	const [isDark] = useThemeContext();

	const fetchData = React.useCallback(async () => {
		if (course !== null) {
			getCourse(`courses/${course.id}/messages`);
		}
	}, [course, getCourse]);

	React.useEffect(() => {
		fetchData();
	}, [fetchData]);

	return (
		<MessagesWrapper dark={isDark}>
			{loading ? (
				<div className="loading-con" />
			) : (
				messages && (
					<>
						<MessagesList messages={messages} />
						<ChatInput dark={isDark} />
					</>
				)
			)}
		</MessagesWrapper>
	);
});

function getPublishedDate(dateTime) {
	const date = new Date(dateTime);
	let day;
	let time;
	try {
		day = date.toDateString();
		time = date.toLocaleTimeString();
		time =
			day === new Date().toDateString()
				? `Today at ${time.substr(0, 5)} ${time.substr(9, 2)}`
				: `${time.substr(0, 5)} ${time.substr(9, 2)}`;

		day = day.substr(4, 11);
	} catch {
		day = null;
		time = null;
	}
	return [day, time];
}

// eslint-disable-next-line react/prop-types
const MessagesList = ({ messages }) => {
	const prevDayRef = React.useRef();

	return (
		<CustomList>
			{messages.length <= 0 ? (
				<MessageEmpty>Conversation is empty, go ahead and starts it</MessageEmpty>
			) : (
				messages.map(message => {
					const [day] = getPublishedDate(message.dateTime);
					let hasDay;
					if (prevDayRef.current !== day) {
						prevDayRef.current = day;
						hasDay = true;
					} else {
						hasDay = false;
					}
					return <Message key={message.id} message={message} hasDay={hasDay} />;
				})
			)}
		</CustomList>
	);
};

// eslint-disable-next-line react/prop-types
const Message = ({ message, hasDay }) => {
	const [day, time] = getPublishedDate(message.dateTime);
	const [isDark] = useThemeContext();

	return (
		<MessageItem dark={isDark}>
			{hasDay ? <span className="date-sep">{day}</span> : null}
			<i className="icon-user" />
			<div>
				<div className="meta-data">
					{message.author.fullName} <span>{time}</span>
				</div>
				<div className="content">{message.content}</div>
			</div>
		</MessageItem>
	);
};

export default Messages;
