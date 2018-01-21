import initialState from './initialState';

export default function itemReducer(state = initialState.items, action) {
	let newState = state;

	switch (action.type) {

		case "CLEAR_ITEM_RESERVATIONS":
			newState = Object.assign({}, state, {
				itemReservations: action.data
			});

			return newState;

		case "CREATE_ITEM":
			if (action.status === 'success') {
				newState = Object.assign({}, state, {
					showItemCreatedPopup: true
				});
			}

			if (action.status === 'failure') {
				newState = Object.assign({}, state, {
					error: action.data
				});
			}

			return newState;

		case "DELETE_DEVICE_TYPE":
			if (action.status === 'success') {
				newState = Object.assign({}, state, {
					deviceTypes: state.deviceTypes.filter(it => it.id !== action.data)
				});
			}

			if (action.status === 'failure') {
				newState = Object.assign({}, state, {
					error: action.data
				});
			}

			return newState;

		case "DELETE_TYPE":
			if (action.status === 'success') {
				newState = Object.assign({}, state, {
					types: state.types.filter(it => it.id !== action.data)
				});
			}

			if (action.status === 'failure') {
				newState = Object.assign({}, state, {
					error: action.data
				});
			}

			return newState;

		case "DELETE_SUBTYPE":
			if (action.status === 'success') {
				newState = Object.assign({}, state, {
					subtypes: state.subtypes.filter(it => it.id !== action.data)
				});
			}

			if (action.status === 'failure') {
				newState = Object.assign({}, state, {
					error: action.data
				});
			}

			return newState;

		case "DELETE_KIT":
			if (action.status === 'success') {
				newState = Object.assign({}, state, {
					kits: state.kits.filter(it => it.id !== action.data)
				});
			}

			if (action.status === 'failure') {
				newState = Object.assign({}, state, {
					error: action.data
				});
			}

			return newState;

		case "DELETE_ITEM":
			if (action.status === 'success') {
				newState = deleteItem(action.data, state);
			}

			if (action.status === 'failure') {
				newState = Object.assign({}, state, {
					error: action.data
				});
			}

			return newState;

		case "EDIT_ITEM":
			if (action.status === 'success') {
				newState = editItem(action.data, state);
			}

			if (action.status === 'failure') {
				newState = Object.assign({}, state, {
					error: action.data
				});
			}

			return newState;

		case "GET_ALL_DEVICE_TYPES":
			if (action.status === 'success') {
				newState = Object.assign({}, state, {
					deviceTypes: action.data
				});
			}

			if (action.status === 'failure') {
				newState = Object.assign({}, state, {
					error: action.data
				});
			}

			return newState;

		case "GET_ALL_ITEMS":
			if (action.status === 'success') {
				newState = Object.assign({}, state, {
					itemList: action.data,
					itemsLoading: false
				});
			}

			if (action.status === 'failure') {
				newState = Object.assign({}, state, {
					error: action.data
				});
			}

			return newState;

		case "GET_ALL_KITS":
			if (action.status === 'success') {
				newState = Object.assign({}, state, {
					kits: action.data
				});
			}

			if (action.status === 'failure') {
				newState = Object.assign({}, state, {
					error: action.data
				});
			}

			return newState;

		case "GET_ALL_SUBTYPES":
			if (action.status === 'success') {
				newState = Object.assign({}, state, {
					subtypes: action.data
				});
			}

			if (action.status === 'failure') {
				newState = Object.assign({}, state, {
					error: action.data
				});
			}

			return newState;

		case "GET_ALL_TYPES":
			if (action.status === 'success') {
				newState = Object.assign({}, state, {
					types: action.data
				});
			}

			if (action.status === 'failure') {
				newState = Object.assign({}, state, {
					error: action.data
				});
			}

			return newState;

		case "GET_ITEM_STATUS":
			if (action.status === 'success') {
				newState = Object.assign({}, state, {
					status: action.data
				});
			}

			if (action.status === 'failure') {
				newState = Object.assign({}, state, {
					error: action.data
				});
			}

			return newState;

		case "GET_RESERVATION_HISTORY":
			if (action.status === 'success') {
				newState = Object.assign({}, state, {
					itemReservations: action.data
				});
			}

			if (action.status === 'failure') {
				newState = Object.assign({}, state, {
					error: action.data
				});
			}

			return newState;

		case "SET_CURRENT_ITEM":
			if (action.status === 'success') {
				newState = Object.assign({}, state, {
					currentItemID: action.data
				});
			}

			if (action.status === 'failure') {
				newState = Object.assign({}, state, {
					error: action.data
				});
			}

			return newState;
			
		case "RESET_LOADING_FLAG":
			newState = Object.assign({}, state, {
				itemsLoading: action.data
			});

			return newState;


		default:
			return state;
	}
}

function deleteItem(item_id, state) {
	let itemList = [...state.itemList];

	for (let i = 0; i < itemList.length; i++) {
		if (itemList[i].id === item_id)
			itemList.splice(i, 1);
	}

	const newState = Object.assign({}, state, {
		itemList
	});

	return newState;
}



function editItem(item, state) {
	let itemList = [...state.itemList];

	for (let i = 0; i < itemList.length; i++) {
		if (itemList[i].id === item.id) {
			const newItem = Object.assign({}, itemList[i], {
				description: item.description,
				identifier: item.identifier
			});
			itemList[i] = newItem;
		}
	}

	const newState = Object.assign({}, state, {
		itemList
	});

	return newState;
}

