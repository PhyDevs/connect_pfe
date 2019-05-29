import React from 'react';
import PropTypes from 'prop-types';
import { CustomOuterList, CustomInnerList, MessageItem, MessageEmpty } from './Elements';
import { useThemeContext } from '../../providers/ThemeContext';
import { useFetch } from '../../utils/use-request';

function getPublishedDate(dateTime) {
	const date = new Date(dateTime);
	let day;
	let time;
	try {
		day = date.toDateString();
		time = date.toLocaleTimeString();

		const timeArr = time.split(' ');
		const timeFormated = `${timeArr[0].substr(0, timeArr[0].length - 3)} ${timeArr[1]}`;
		time = day === new Date().toDateString() ? `Today at ${timeFormated}` : timeFormated;

		day = day.substr(4, 11);
	} catch {
		day = null;
		time = null;
	}

	return [day, time];
}

const MessagesList = ({ messages, courseId, addMessage }) => {
	const [{ loading }, getCourse] = useFetch();
	const offsetRef = React.useRef(10);
	const shouldScrollRef = React.useRef(true);
	const scrollableRef = React.useRef();

	React.useLayoutEffect(() => {
		if (shouldScrollRef.current && scrollableRef.current !== undefined) {
			scrollableRef.current.scrollTop = scrollableRef.current.scrollHeight - scrollableRef.current.clientHeight;
		}
	}, [messages]);

	const handleScroll = async e => {
		const el = e.target;
		const prevHeight = scrollableRef.current.scrollHeight;

		if (offsetRef.current !== null && el.scrollTop === 0 && messages.length >= 10) {
			const { data } = await getCourse(`courses/${courseId}/messages/${offsetRef.current}`, false);
			if (data) {
				offsetRef.current = data.length >= 10 ? offsetRef.current + 10 : null;
				shouldScrollRef.current = false;
				addMessage(data);
				scrollableRef.current.scrollTop = scrollableRef.current.scrollHeight - prevHeight;
			}

			shouldScrollRef.current = true;
		}
	};

	return (
		<CustomOuterList ref={scrollableRef} onScroll={handleScroll}>
			<CustomInnerList>
				{messages.length <= 0 ? (
					<MessageEmpty>Conversation is empty, go ahead and starts it</MessageEmpty>
				) : (
					<>
						{messages.map((message, index) => {
							const [day] = getPublishedDate(message.dateTime);
							const [nextDay] = !messages[index + 1] ? [null] : getPublishedDate(messages[index + 1].dateTime);
							const hasDay = nextDay !== day;

							return <Message key={message.id} message={message} hasDay={hasDay} />;
						})}
						{loading && <div className="loading-con-sm" />}
					</>
				)}
			</CustomInnerList>
		</CustomOuterList>
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

MessagesList.propTypes = {
	messages: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.number,
			content: PropTypes.string,
			dateTime: PropTypes.string,
		})
	),
	courseId: PropTypes.number.isRequired,
	addMessage: PropTypes.func.isRequired,
};

MessagesList.defaultProps = {
	messages: null,
};

export default MessagesList;
