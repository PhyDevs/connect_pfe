const idKey = '__USER_ID__';
const roleKey = '__USER_ROLE__';
const tokenKey = '__TOKEN_KEY__';

/**FIX TPYE */
export const authenticate = ({ token, user }: {token: string, user: any}) => {
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

/**FIX TPYE */
export const getUserInfo: any = () => {
	try {
		const token = localStorage.getItem(tokenKey);
		const id = localStorage.getItem(idKey);
		const role = localStorage.getItem(roleKey);

		return { token, id, role };
	} catch {
		throw Error("localStorage isn't accessible");
	}
};
