import initialState from './initialState';
import { RESERVATION_STATUS } from 'util/constants';

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
				newState = filterReservations(action.data, state);
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
	let toApprove = [...state.toApprove];
	let declined = [...state.declined];
	let approved = [...state.approved];
	let reservation;

	for(let i = 0; i < toApprove.length; i++) {
		if(toApprove[i].id === reservation_id) {
			reservation = { ...toApprove[i] };
			reservation.status.name = "Odobrena";
			toApprove.splice(i, 1);
			approved.push(reservation);
			break;
		}
	}

	for(let i = 0; i < declined.length; i++) {
		if(declined[i].id === reservation_id) {
			reservation = { ...declined[i] };
			reservation.status.name = "Odobrena";
			declined.splice(i, 1);
			approved.push(reservation);
			break;
		}
	}

	const newState = Object.assign({}, state, {
		toApprove,
		approved,
		declined
	});

	return newState;
}

function declineReservation(reservation_id, state) {
	let toApprove = [...state.toApprove];
	let declined = [...state.declined];
	let approved = [...state.approved];
	let reservation = {};

	for(let i = 0; i < toApprove.length; i++) {
		if(toApprove[i].id === reservation_id) {
			reservation = { ...toApprove[i] };
			reservation.status.name = "Odbijena";
			toApprove.splice(i, 1);
			declined.push(reservation);
			break;
		}
	}

	for(let i = 0; i < approved.length; i++) {
		if(approved[i].id === reservation_id) {
			reservation = { ...approved[i] };
			reservation.status.name = "Odbijena";
			approved.splice(i, 1);
			declined.push(reservation);
			break;
		}
	}

	

	const newState = Object.assign({}, state, {
		toApprove,
		approved,
		declined
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

function filterReservations(reservationList, state) {
	let toApprove = [];
	let approved = [];
	let declined = [];

	for(let i = 0; i < reservationList.length; i++) {
		switch(reservationList[i].status_id) {

			case RESERVATION_STATUS.TO_APPROVE:
				toApprove.push(reservationList[i]);
				continue;

			case RESERVATION_STATUS.APPROVED:
				approved.push(reservationList[i]);
				continue;

			case RESERVATION_STATUS.DECLINED:
				declined.push(reservationList[i]);
				continue;

			default:
				continue;
		}
	}

	const newState = Object.assign({}, state, {
		toApprove,
		approved,
		declined
	});

	return newState;
}

