const idKey = '__USER_ID__';
const roleKey = '__USER_ROLE__';
const tokenKey = '__TOKEN_KEY__';

export const authenticate = ({ token, user }) => {
	try {
		localStorage.setItem(tokenKey, token);
		localStorage.setItem(idKey, user.id);
		localStorage.setItem(roleKey, user.role);
	} catch {
		throw Error("localStorage isn't accessible");
	}
};

export const isAuthenticated = () => {
	try {
		const token = localStorage.getItem(tokenKey);
		if (token) return true;
	} catch {
		throw Error("localStorage isn't accessible");
	}
	return false;
};

export const logout = () => {
	try {
		localStorage.removeItem(tokenKey);
		localStorage.removeItem(idKey);
		localStorage.removeItem(roleKey);
	} catch {
		throw Error("localStorage isn't accessible");
	}
};
