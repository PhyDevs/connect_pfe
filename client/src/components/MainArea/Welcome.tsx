import React from 'react';
import { WelcomeWrapper, BigTitle } from './Elements';
import { useDataContext } from '../../providers/DataContext';
import { useThemeContext } from '../../providers/ThemeContext';

const Welcome = React.memo(() => {
	const [isDark] = useThemeContext();
	const {
		state: { user },
	} = useDataContext();

	return (
		<WelcomeWrapper dark={isDark}>
			<BigTitle dark={isDark}>
				<h1>welcome back</h1>
				<h3>{user?.fullName}</h3>
			</BigTitle>
		</WelcomeWrapper>
	);
});

export default Welcome;
