import initialState from './initialState';

export default function reservationReducer(state = initialState.reservations, action) {
	let newState = state;
	
	switch(action.type) {

		case "GET_ALL_RESERVATIONS":
			if(action.status === 'success') {
				newState = Object.assign({}, state, {
					reservationList: action.data
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

