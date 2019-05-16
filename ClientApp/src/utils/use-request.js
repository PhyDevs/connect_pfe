import React from 'react';
import axios from 'axios';
import API_PATH from './api_path';

const types = {
	SUBMIT_STARTED: 0,
	SUBMIT_DONE: 1,
};

const requsetReducer = (state, action) => {
	switch (action.type) {
		case types.SUBMIT_STARTED:
			return { ...state, loading: true };
		case types.SUBMIT_DONE:
			return { ...state, loading: false, ...action.payload };
		default:
			return state;
	}
};

const usePost = () => {
	const [state, dispatch] = React.useReducer(requsetReducer, {
		loading: false,
		data: null,
		errors: null,
	});

	const send = async (route, data) => {
		let res = { data: null };
		try {
			dispatch({ type: types.SUBMIT_STARTED });
			res = await axios.post(`${API_PATH}/${route}`, data);
			dispatch({ type: types.SUBMIT_DONE, payload: { data: res.data, errors: null } });
		} catch (err) {
			const errors = !err.response ? { error: 'Connection error' } : err.response.data;
			dispatch({ type: types.SUBMIT_DONE, payload: { data: null, errors } });
		}

		return res;
	};

	return [state, send];
};

export { usePost };
