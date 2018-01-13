export function changeActiveTab({ data }) {
	return {
		data,
		type: "CHANGE_ACTIVE_TAB",
	}
}

export function loadAllUsers({ status, data }) {
	return {
		data,
		status,
		type: "LOAD_ALL_USERS",
	}
}

export function login({ status, data }) {
	return {
		data,
		status,
		type: "LOGIN",
	}
}

export function logout({ data }) {
	return {
		data,
		type: "LOGOUT",
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
