import React from 'react';


const ThemeContext = React.createContext<ThemeState | undefined>(undefined);

const ThemeProvider = ({ children }: ThemeProviderProps) => {
	const time = new Date().getHours();
	let isDark: boolean | undefined;

	try {
		const value = localStorage.getItem('dark');
		isDark = !value ? undefined : value === 'true';
	} finally {
		if (isDark === undefined) isDark = !(time <= 18 && time > 6);
	}

	React.useEffect(() => {
		if (isDark) document.body.classList.add('dark');
		else document.body.classList.remove('dark');
	}, [isDark]);

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

const useThemeContext = (): [boolean, () => void] => {
	const context = React.useContext(ThemeContext);
	if (context === undefined) throw Error('useThemeContext must be used inside ThemeProvider');

	const { dark, setDark } = context;
	const toggleDark = React.useCallback(() => {
		try {
			localStorage.setItem('dark', `${!dark}`);
		} finally {
			setDark(d => !d);
		}
	}, [dark, setDark]);

	return [dark, toggleDark];
};

type ThemeProviderProps = {
	children: JSX.Element,
};
type ThemeState = {
	dark: boolean,
	setDark: React.Dispatch<React.SetStateAction<boolean>>
};

export { ThemeProvider, useThemeContext };
