export function getAllReservations({ status, data }) {
	return {
		data,
		status,
		type: "GET_ALL_RESERVATIONS",
	}
}