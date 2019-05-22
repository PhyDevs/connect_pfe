import React from 'react';
import PropTypes from 'prop-types';

const DataContext = React.createContext();

const DataProvider = ({ children }) => {
	const [state, setState] = React.useState({
		user: null,
		currentCourse: null,
	});

	const value = React.useMemo(() => ({ state: [state, setState] }), [state]);
	return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};

DataProvider.propTypes = {
	children: PropTypes.node.isRequired,
};

const useDataContext = () => {
	const context = React.useContext(DataContext);
	if (context === undefined) throw Error('useDataContext must be used inside DataProvider');

	const {
		state: [state, setState],
	} = context;

	const setUser = React.useCallback(
		name => {
			setState(prevState => ({ ...prevState, user: name }));
		},
		[setState]
	);

	const setCourse = React.useCallback(
		course => {
			setState(prevState => ({ ...prevState, currentCourse: course }));
		},
		[setState]
	);

	return { state, setUser, setCourse };
};

export { DataProvider, useDataContext };
