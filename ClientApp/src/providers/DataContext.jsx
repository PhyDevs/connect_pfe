import React from 'react';
import PropTypes from 'prop-types';

const DataContext = React.createContext();

const DataProvider = ({ children }) => {
	const [state, setState] = React.useState({
		user: null,
		currentDepartment: null,
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

	const setDepartment = React.useCallback(
		department => {
			setState(prevState => ({ ...prevState, currentDepartment: department }));
		},
		[setState]
	);

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

	return { state, setUser, setDepartment, setCourse };
};

export { DataProvider, useDataContext };
