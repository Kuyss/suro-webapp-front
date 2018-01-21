import initialState from './initialState';
import { RESERVATION_STATUS } from 'util/constants';

export default function reservationReducer(state = initialState.reservations, action) {
	let newState = state;
	
	switch(action.type) {

		case "ADMIN_DELETE_RESERVATION":
			if(action.status === 'success') {
				newState = adminDeleteReservation(action.data, state);
			}
			
			if(action.status === 'failure') {
				newState = Object.assign({}, state, {
					error: action.data
				});
			}

			return newState;

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

		case "ADMIN_EXTEND_RESERVATION":
			if(action.status === 'success') {
				newState = extendReservation(action.data, state);
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

		case "GET_RESERVATIONS_TO_EXTEND":
			if(action.status === 'success') {
				newState = Object.assign({}, state, {
					toExtend: action.data.filter(e => {return e.status === 'Zatraženo produživanje'})
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

		case "REFUSE_RESERVATION":
			if(action.status === 'success') {
				newState = extendReservation(action.data, state);
			}
			
			if(action.status === 'failure') {
				newState = Object.assign({}, state, {
					error: action.data
				});
			}

			return newState;

		case "RETURN_RESERVATION":
			if(action.status === 'success') {
				newState = returnReservation(action.data, state);
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

function adminDeleteReservation({reservation_id, type}, state) {
	let array = [];

	if(type === "DECLINED") array = [...state.declined];
	if(type === "TO_APPROVE") array = [...state.toApprove];
	if(type === "APPROVED") array = [...state.approved];

	for(let i = 0; i < array.length; i++) {
		if(array[i].id === reservation_id)
			array.splice(i, 1);
	}

	let newState;

	if(type === "DECLINED") newState = Object.assign({}, state, { declined: array });
	if(type === "TO_APPROVE") newState = Object.assign({}, state, { toApprove: array });
	if(type === "APPROVED") newState = Object.assign({}, state, { approved: array });

	return newState;
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
	let activeUsersReservationList = [...state.activeUsersReservationList];

	activeUsersReservationList = activeUsersReservationList.filter(e => e.id !== reservation_id);

	const newState = Object.assign({}, state, {
		activeUsersReservationList
	});

	return newState;
}

function extendReservation(extend_id, state) {
	let toExtend = [...state.toExtend];

	for(let i = 0; i < toExtend.length; i++) {
		if(toExtend[i].id === extend_id) {
			toExtend.splice(i, 1);
		}
	}

	const newState = Object.assign({}, state, {
		toExtend
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
		declined,
		reservationsLoading: false
	});

	return newState;
}

function returnReservation(reservation_id, state) {
	let approved = [...state.approved];

	for(let i = 0; i < approved.length; i++) {
		if(approved[i].id === reservation_id) {
			approved.splice(i, 1);
		}
	}

	const newState = Object.assign({}, state, {
		approved
	});

	return newState;
}

