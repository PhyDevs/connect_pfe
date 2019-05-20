import React from 'react';
import { navigate } from '@reach/router';
import axios from 'axios';
import API_PATH from './api_path';
import { logout, getUserInfo } from './authenticator';

const types = {
	SUBMIT_STARTED: 0,
	SUBMIT_DONE: 1,
};

const cache = {};

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

const useFetch = () => {
	const [state, dispatch] = React.useReducer(requsetReducer, {
		loading: false,
		data: null,
	});

	const get = React.useCallback(async route => {
		let res = { data: null };
		try {
			const { token } = getUserInfo();
			const headers = {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			};
			dispatch({ type: types.SUBMIT_STARTED });
			if (cache[route] !== undefined) {
				res = cache[route];
			} else {
				res = await axios.get(`${API_PATH}/${route}`, { headers });
				cache[route] = res;
			}
			dispatch({ type: types.SUBMIT_DONE, payload: { data: res.data } });
		} catch (err) {
			dispatch({ type: types.SUBMIT_DONE, payload: { data: null } });
			if (!err.response || err.response.status === 401) {
				logout();
				navigate('/login');
			}
		}

		return res;
	}, []);

	return [state, get];
};

export { usePost, useFetch };
