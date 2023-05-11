import React from 'react';
import { CustomOuterList, CustomInnerList, MessageItem, MessageEmpty } from './Elements';
import { useThemeContext } from '../../providers/ThemeContext';
import { useFetch } from '../../utils/use-request';
import { Message } from '../../models';


function getPublishedDate(dateTime: string) {
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

const MessagesList = ({ messages, courseId, addMessage }: MessagesListProps) => {
	const [{ loading }, getCourse] = useFetch();
	const offsetRef = React.useRef<number | null>(10);
	const shouldScrollRef = React.useRef<boolean>(true);
	const scrollableRef = React.useRef<HTMLDivElement>(null);

	React.useLayoutEffect(() => {
		if (shouldScrollRef.current && scrollableRef.current !== null) {
			scrollableRef.current.scrollTop = scrollableRef.current.scrollHeight - scrollableRef.current.clientHeight;
		}
	}, [messages]);

	const handleScroll: React.UIEventHandler<HTMLDivElement> = async e => {
		const el = e.target as HTMLDivElement;
		const prevHeight = scrollableRef.current?.scrollHeight || 0;

		if (offsetRef.current !== null && el.scrollTop === 0 && messages.length >= 10) {
			const { data } = await getCourse(`courses/${courseId}/messages/${offsetRef.current}`, false);
			if (data) {
				offsetRef.current = data.length >= 10 ? offsetRef.current + 10 : null;
				shouldScrollRef.current = false;
				addMessage(data);

				if (scrollableRef.current !== null)
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
const Message = ({ message, hasDay }: MessageProps) => {
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

type MessagesListProps = {
	messages: Array<Message>,
	courseId: number,
	addMessage: Function,
};

type MessageProps = {
	message: Message,
	hasDay: boolean
}

export default MessagesList;
