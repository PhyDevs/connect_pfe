import React from 'react';
import PropTypes from 'prop-types';

const ThemeContext = React.createContext();

const ThemeProvider = ({ children }) => {
	const time = new Date().getHours();
	let isDark;
	try {
		const value = localStorage.getItem('dark');
		isDark = !value ? undefined : value === 'true';
	} finally {
		if (isDark === undefined) isDark = !(time <= 18 && time > 6);
	}

	const [dark, setDark] = React.useState(isDark);

	const state = React.useMemo(
		() => ({
			dark,
			setDark,
		}),
		[dark]
	);

	return <ThemeContext.Provider value={state}>{children}</ThemeContext.Provider>;
};

const useThemeContext = () => {
	const context = React.useContext(ThemeContext);
	if (context === undefined) throw Error('useThemeContext must be used inside ThemeProvider');

	const { dark, setDark } = context;
	const toggleDark = React.useCallback(() => {
		try {
			localStorage.setItem('dark', !dark);
		} finally {
			setDark(d => !d);
		}
	}, [dark, setDark]);

	return [dark, toggleDark];
};

ThemeProvider.propTypes = {
	children: PropTypes.node.isRequired,
};

export { ThemeProvider, useThemeContext };
