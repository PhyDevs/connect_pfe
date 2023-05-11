import React from 'react';
import PropTypes from 'prop-types';
import { Course, Department, User } from '../models';

const DataContext = React.createContext<DataContextState | undefined>(undefined);

const DataProvider = ({ children }: DataProviderProps) => {
	const [state, setState] = React.useState<DataState>({
		user: undefined,
		currentDepartment: undefined,
		currentCourse: undefined,
	});

	const value: DataContextState = React.useMemo(() => ({ state: [state, setState] }), [state]);
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
		(department: Department) => {
			setState(prevState => ({ ...prevState, currentDepartment: department }));
		},
		[setState]
	);

	const setUser = React.useCallback(
		(user: User) => {
			setState(prevState => ({ ...prevState, user }));
		},
		[setState]
	);

	const setCourse = React.useCallback(
		(course: Course) => {
			setState(prevState => ({ ...prevState, currentCourse: course }));
		},
		[setState]
	);

	return { state, setUser, setDepartment, setCourse };
};


type DataProviderProps = {
	children: JSX.Element,
}

type DataState = {
	user: User | undefined,
	currentDepartment: Department | undefined,
	currentCourse: Course | undefined,
}

type DataContextState = {
	state: [DataState, React.Dispatch<React.SetStateAction<DataState>>]
}

export { DataProvider, useDataContext };
