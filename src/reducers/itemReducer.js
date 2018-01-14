import initialState from './initialState';

export default function itemReducer(state = initialState.items, action) {
	let newState = state;
	
	switch(action.type) {

		case "CREATE_ITEM":
			if(action.status === 'success') {
				newState = Object.assign({}, state, {
					showItemCreatedPopup: true
				});
			}
			
			if(action.status === 'failure') {
				newState = Object.assign({}, state, {
					error: action.data
				});
			}

			return newState;

		case "DELETE_ITEM":
			if(action.status === 'success') {
				newState = deleteItem(action.data, state);
			}
			
			if(action.status === 'failure') {
				newState = Object.assign({}, state, {
					error: action.data
				});
			}

			return newState;

		case "EDIT_ITEM":
			if(action.status === 'success') {
				newState = editItem(action.data, state);
			}
			
			if(action.status === 'failure') {
				newState = Object.assign({}, state, {
					error: action.data
				});
			}

			return newState;

		case "GET_ALL_DEVICE_TYPES":
			if(action.status === 'success') {
				newState = Object.assign({}, state, {
					deviceTypes: action.data
				});
			}
			
			if(action.status === 'failure') {
				newState = Object.assign({}, state, {
					error: action.data
				});
			}

			return newState;

		case "GET_ALL_ITEMS":
			if(action.status === 'success') {
				newState = Object.assign({}, state, {
					itemList: action.data
				});
			}
			
			if(action.status === 'failure') {
				newState = Object.assign({}, state, {
					error: action.data
				});
			}

			return newState;

		case "GET_ALL_KITS":
			if(action.status === 'success') {
				newState = Object.assign({}, state, {
					kits: action.data
				});
			}
			
			if(action.status === 'failure') {
				newState = Object.assign({}, state, {
					error: action.data
				});
			}

			return newState;

		case "GET_ALL_SUBTYPES":
			if(action.status === 'success') {
				newState = Object.assign({}, state, {
					subtypes: action.data
				});
			}
			
			if(action.status === 'failure') {
				newState = Object.assign({}, state, {
					error: action.data
				});
			}

			return newState;

		case "GET_ALL_TYPES":
			if(action.status === 'success') {
				newState = Object.assign({}, state, {
					types: action.data
				});
			}
			
			if(action.status === 'failure') {
				newState = Object.assign({}, state, {
					error: action.data
				});
			}

			return newState;

		default:
			return state;
	}
}

function deleteItem(item_id, state) {
	let itemList = [...state.itemList];

	for(let i = 0; i < itemList.length; i++) {
		if(itemList[i].id === item_id)
			itemList.splice(i, 1);
	}

	const newState = Object.assign({}, state, {
		itemList
	});

	return newState;
}

function editItem(item, state) {
	let itemList = [...state.itemList];

	for(let i = 0; i < itemList.length; i++) {
		if(itemList[i].id === item.id)
			itemList[i] = item;
	}

	const newState = Object.assign({}, state, {
		itemList
	});

	return newState;
}

