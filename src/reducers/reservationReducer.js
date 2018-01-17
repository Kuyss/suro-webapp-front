import initialState from './initialState';

export default function reservationReducer(state = initialState.reservations, action) {
	let newState = state;
	
	switch(action.type) {

		case "APPROVE_RESERVATION":
			if(action.status === 'success') {
				newState = approveReservation(action.data, state);
			}
			
			if(action.status === 'failure') {
				newState = Object.assign({}, state, {
					error: action.data
				});
			}

			return newState;

		case "DECLINE_RESERVATION":
			if(action.status === 'success') {
				newState = declineReservation(action.data, state);
			}
			
			if(action.status === 'failure') {
				newState = Object.assign({}, state, {
					error: action.data
				});
			}

			return newState;

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

		case "GET_ACTIVE_USERS_RESERVATIONS":
			if(action.status === 'success') {
				newState = Object.assign({}, state, {
					activeUsersReservationList: action.data
				});
			}
			
			if(action.status === 'failure') {
				newState = Object.assign({}, state, {
					error: action.data
				});
			}

			return newState;

		case "DELETE_RESERVATION":
			if(action.status === 'success') {
				newState = deleteReservation(action.data, state);
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

function approveReservation(reservation_id, state) {
	let reservationList = [...state.reservationList];

	for(let i = 0; i < reservationList.length; i++) {
		if(reservationList[i].id === reservation_id) 
			reservationList[i].status.name = "Odobrena";
	}

	const newState = Object.assign({}, state, {
		reservationList
	});

	return newState;
}

function declineReservation(reservation_id, state) {
	let reservationList = [...state.reservationList];

	for(let i = 0; i < reservationList.length; i++) {
		if(reservationList[i].id === reservation_id) 
			reservationList[i].status.name = "Odbijena";
	}

	const newState = Object.assign({}, state, {
		reservationList
	});

	return newState;
}

function deleteReservation(reservation_id, state) {
	let reservationList = [...state.reservationList];

	reservationList = reservationList.filter(e => e.id !== reservation_id);

	const newState = Object.assign({}, state, {
		reservationList
	});

	return newState;
}

