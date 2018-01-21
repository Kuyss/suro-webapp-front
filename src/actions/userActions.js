export function activateUser({ status, data }) {
	return {
		data,
		status,
		type: "ACTIVATE_USER",
	}
}

export function changeActiveTab({ data }) {
	return {
		data,
		type: "CHANGE_ACTIVE_TAB",
	}
}

export function changeUserActive({ status, data }) {
	return {
		data,
		status,
		type: "CHANGE_USER_ACTIVE",
	}
}

export function deleteUser({ status, data }) {
	return {
		data,
		status,
		type: "DELETE_USER",
	}
}

export function editUser({ status, data }) {
	return {
		data,
		status,
		type: "EDIT_USER",
	}
}

export function loadAllInactiveUsers({ status, data }) {
	return {
		data,
		status,
		type: "LOAD_ALL_INACTIVE_USERS",
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
