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