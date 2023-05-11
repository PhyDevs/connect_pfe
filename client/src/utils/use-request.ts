import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import API_PATH from './api_path';
import { logout, getUserInfo } from './authenticator';


const cache: {[route: string]: any} = {};

const requsetReducer = (state: RequestState, action: RequestAction) => {
	switch (action.type) {
		case 'SUBMIT_STARTED':
			return { ...state, loading: true };
		case 'SUBMIT_DONE':
			return { ...state, loading: false, ...action.payload };
		default:
			return state;
	}
};

const usePost = () => {
	const [state, dispatch] = React.useReducer(requsetReducer, {
		loading: false,
		errors: null,
	});

	const send = async (route: string, data: any) => {
		let res = { data: null };
		try {
			const { token } = getUserInfo();
			const headers = {
				'Content-Type': 'application/json',
				'Authorization': ''
			}
			if (token !== null) headers.Authorization = `Bearer ${token}`;

			dispatch({ type: 'SUBMIT_STARTED' });
			res = await axios.post(`${API_PATH}/${route}`, data, { headers });
			dispatch({ type: 'SUBMIT_DONE', payload: { errors: null } });
		} catch (err: any) {
			const errors = !err.response ? { error: 'Connection error' } : err.response.data;
			dispatch({ type: 'SUBMIT_DONE', payload: { errors } });
		}

		return res;
	};

	return [state, send];
};

const useFetch = () => {
	const navigate = useNavigate();
	const [state, dispatch] = React.useReducer(requsetReducer, {
		loading: false,
		data: null,
	});

	const get = React.useCallback(async (route: string, isCached = true) => {
		let res = { data: null };
		try {
			const { token } = getUserInfo();
			const headers = {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			};
			dispatch({ type: 'SUBMIT_STARTED' });
			if (cache[route] !== undefined && isCached) {
				res = cache[route];
			} else {
				res = await axios.get(`${API_PATH}/${route}`, { headers });
				cache[route] = isCached ? res : null;
			}
			dispatch({ type: 'SUBMIT_DONE', payload: { data: res.data } });
		} catch (err: any) {
			dispatch({ type: 'SUBMIT_DONE', payload: { data: null } });
			if (!err.response || err.response.status === 401) {
				logout();
				navigate('/login');
			} else if (err.response.status === 404 || err.response.status === 400) {
				return 404;
			}
		}

		return res;
	}, []);

	return [state, get];
};

type RequestState = {
	loading: boolean,
	data: any,
}

interface RequestAction {
	type: 'SUBMIT_STARTED' | 'SUBMIT_DONE';
	payload?: any;
  }

export { usePost, useFetch };
