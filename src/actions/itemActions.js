export function createItem({ status, data }) {
	return {
		data,
		status,
		type: "CREATE_ITEM",
	}
}

export function getAllDeviceTypes({ status, data }) {
	return {
		data,
		status,
		type: "GET_ALL_DEVICE_TYPES",
	}
}

export function getAllItems({ status, data }) {
	return {
		data,
		status,
		type: "GET_ALL_ITEMS",
	}
}

export function getAllKits({ status, data }) {
	return {
		data,
		status,
		type: "GET_ALL_KITS",
	}
}

export function getAllSubtypes({ status, data }) {
	return {
		data,
		status,
		type: "GET_ALL_SUBTYPES",
	}
}

export function getAllTypes({ status, data }) {
	return {
		data,
		status,
		type: "GET_ALL_TYPES",
	}
}


