export function clearItemReservations({ data }) {
	return {
		data,
		type: "CLEAR_ITEM_RESERVATIONS",
	}
}

export function createItem({ status, data }) {
	return {
		data,
		status,
		type: "CREATE_ITEM",
	}
}

export function deleteDeviceType({ status, data }) {
	return {
		data,
		status,
		type: "DELETE_DEVICE_TYPE",
	}
}

export function deleteType({ status, data }) {
	return {
		data,
		status,
		type: "DELETE_TYPE",
	}
}

export function deleteSubtype({ status, data }) {
	return {
		data,
		status,
		type: "DELETE_SUBTYPE",
	}
}

export function deleteKit({ status, data }) {
	return {
		data,
		status,
		type: "DELETE_KIT",
	}
}

export function deleteItem({ status, data }) {
	return {
		data,
		status,
		type: "DELETE_ITEM",
	}
}

export function editItem({ status, data }) {
	return {
		data,
		status,
		type: "EDIT_ITEM",
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


export function getItemStatus({ status, data }) {
	return {
		data,
		status,
		type: "GET_ITEM_STATUS",
	}
}

export function getReservationHistory({ status, data }) {
	return {
		data,
		status,
		type: "GET_RESERVATION_HISTORY",
	}
}

export function setCurrentItem({ status, data }) {
	return {
		data,
		status,
		type: "SET_CURRENT_ITEM",
	}
}

export function resetLoadingFlag({ data }) {
	return {
		data,
		type: "RESET_LOADING_FLAG",
	}
}