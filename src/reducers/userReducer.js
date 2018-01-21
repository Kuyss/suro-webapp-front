import initialState from './initialState';
import history from '../history';
import { ROLES } from 'util/constants';

export default function userReducer(state = initialState.users, action) {
	let newState = state;
	
	switch(action.type) {

		case "ACTIVATE_USER":
			if(action.status === 'success') {
				newState = activateUser(action.data, state);
			}
			
			if(action.status === 'failure') {
				newState = Object.assign({}, state, {
					error: action.data
				});
			}

			return newState;

		case "CHANGE_ACTIVE_TAB":
			newState = Object.assign({}, state, {
				activeTab: action.data
			});

			return newState;

		case "CHANGE_USER_ACTIVE":
			if(action.status === 'success') {
				console.log("changed");
				newState = changeUserActive(action.data, state);
			}
			
			if(action.status === 'failure') {
				newState = Object.assign({}, state, {
					error: action.data
				});
			}

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

		case "EDIT_USER":
			if(action.status === 'success') {
				console.log("edited");
				newState = editUser(action.data, state);
			}
			
			if(action.status === 'failure') {
				newState = Object.assign({}, state, {
					error: action.data
				});
			}

			return newState;

		case "LOAD_ALL_INACTIVE_USERS":
			if(action.status === 'success') {
				newState = Object.assign({}, state, {
					userList: action.data.filter(e => { return e.active === 0 })
				});
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
				const role_id = action.data.user.role_id;
				let activeTab = 'home';
				let path = '/';
				
				if(role_id === ROLES.ADMIN) {
					activeTab = 'user management';
					path = '/user_management';
				} 
				else if(role_id === ROLES.USER) {
					activeTab = 'search equipment';
					path = '/search_equipment';
				}

				newState = Object.assign({}, state, {
					activeTab,
					currentUser: action.data.user,
					currentUserRole: action.data.user.role_id,
					showLoginPopup: true,
					token: action.data.token
				});

				history.push(path);
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

function activateUser(user, state) {
	let userList = [...state.userList];

	for(let i = 0; i < userList.length; i++) {
		if(userList[i].id === user.id)
			userList.splice(i, 1);
	}

	const newState = Object.assign({}, state, {
		userList
	});

	return newState;
}

function changeUserActive(user_id, state) {
	let userList = [...state.userList];

	for(let i = 0; i < userList.length; i++) {
		if(userList[i].id === user_id) {
			if(userList[i].active === 1) {
				userList[i].active = 0;
				break;
			}
			else if(userList[i].active === 0) {
				userList[i].active = 1;
				break;
			}
			console.log(userList[i].active);
		}
	}

	const newState = Object.assign({}, state, {
		userList
	});

	return newState;	
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

function editUser(user, state) {
	let userList = [...state.userList];

	for(let i = 0; i < userList.length; i++) {
		if(userList[i].id === user.id) {
			let active = userList[i].active;
			userList[i] = user;
			userList[i].active = active;
		}
	}

	const newState = Object.assign({}, state, {
		userList
	});

	return newState;
}





