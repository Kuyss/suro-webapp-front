export function approveReservation({ status, data }) {
	return {
		data,
		status,
		type: "APPROVE_RESERVATION",
	}
}

export function declineReservation({ status, data }) {
	return {
		data,
		status,
		type: "DECLINE_RESERVATION",
	}
}

export function getAllReservations({ status, data }) {
	return {
		data,
		status,
		type: "GET_ALL_RESERVATIONS",
	}
}

export function getActiveUsersReservations({ status, data }) {
	return {
		data,
		status,
		type: "GET_ACTIVE_USERS_RESERVATIONS",
	}
}

export function deleteReservation({ status, data }) {
	return {
		data,
		status,
		type: "DELETE_RESERVATION",
	}
}

export function returnReservation({ status, data }) {
	return {
		data,
		status,
		type: "RETURN_RESERVATION",
	}
}