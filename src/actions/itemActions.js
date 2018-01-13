export function getAllItems({ status, data }) {
	return {
		data,
		status,
		type: "GET_ALL_ITEMS",
	}
}