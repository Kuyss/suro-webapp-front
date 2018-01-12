export function login({ status, data }) {
	return {
		data,
		status,
		type: "LOGIN",
	}
}

export function register({ status, data }) {
	return {
		data,
		status,
		type: "REGISTER",
	}
}

export function showPopup({ data }) {
	return {
		data,
		type: "USER_SHOW_POPUP",
	}
}
