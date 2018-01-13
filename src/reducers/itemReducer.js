import initialState from './initialState';

export default function itemReducer(state = initialState.items, action) {
	let newState = state;
	
	switch(action.type) {

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

	

		default:
			return state;
	}
}

