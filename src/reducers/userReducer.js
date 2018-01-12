import initialState from './initialState';

export default function userReducer(state = initialState.users, action) {
	let newState = state;
	
	switch(action.type) {

		case "LOGIN":
			if(action.status === 'success') {
				newState = Object.assign({}, state, {
					currentUser: action.data,
					currentUserRole: action.data.user.role_id,
					showLoginPopup: true,
					token: action.data.token
				});
			}
			
			if(action.status === 'failure') {
				newState = Object.assign({}, state, {
					error: action.data
				});
			}

			return newState;

		case "REGISTER":
			if(action.status === 'success') {
				newState = Object.assign({}, state, {
					showRegisterPopup: true
				});
			}

			if(action.status === 'failure') {
				newState = Object.assign({}, state, {
					error: action.data
				});
			}

			return newState;

		case "USER_SHOW_POPUP":
			if(action.data.name === 'REGISTER')
				newState = Object.assign({}, state, {
					showRegisterPopup: action.data.value
				});

			if(action.data.name === 'LOGIN')
				newState = Object.assign({}, state, {
					showLoginPopup: action.data.value
				});

			return newState;

		default:
			return state;
	}
}

