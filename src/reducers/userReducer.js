import initialState from './initialState';

export default function userReducer(state = initialState.users, action) {
	let newState = state;
	
	switch(action.type) {

		case "CHANGE_ACTIVE_TAB":
			newState = Object.assign({}, state, {
				activeTab: action.data
			});

			return newState;

		case "DELETE_USER":
			if(action.status === 'success') {
				newState = deleteUser(action.data, state);
			}
			
			if(action.status === 'failure') {
				newState = Object.assign({}, state, {
					error: action.data
				});
			}

			return newState;

		case "LOAD_ALL_USERS":
			if(action.status === 'success') {
				newState = Object.assign({}, state, {
					userList: action.data
				});
			}
			
			if(action.status === 'failure') {
				newState = Object.assign({}, state, {
					error: action.data
				});
			}

			return newState;

		case "LOGIN":
			if(action.status === 'success') {
				newState = Object.assign({}, state, {
					currentUser: action.data.user,
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

function deleteUser(user_id, state) {
	let userList = [...state.userList];

	for(let i = 0; i < userList.length; i++) {
		if(userList[i].id === user_id)
			userList.splice(i, 1);
	}

	const newState = Object.assign({}, state, {
		userList
	});

	return newState;
}

