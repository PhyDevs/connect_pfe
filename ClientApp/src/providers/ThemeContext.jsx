import React from 'react';
import PropTypes from 'prop-types';

const ThemeContext = React.createContext();

const ThemeProvider = ({ children }) => {
	const time = new Date().getHours();
	const [dark, setDark] = React.useState(!(time <= 18 && time > 6));

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
	const toggleDark = React.useCallback(() => setDark(d => !d), [setDark]);

	return [dark, toggleDark];
};

ThemeProvider.propTypes = {
	children: PropTypes.node.isRequired,
};

export { ThemeProvider, useThemeContext };
