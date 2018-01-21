import env from '../util/enviroment'; 
import * as actions from '../actions/userActions';

var request = require('superagent');

const userActions = {

	activateUser(user, token) {
		console.log(user);
		return dispatch => {
			request
				.put(`${env.api}/admin/users/edit`)
				.set('Authorization', `bearer ${token}`)
				.send({ user: JSON.stringify(user) })
				.accept('application/json')
				.end((err, res) => {
					if(err) {
						dispatch(actions.activateUser({ status: "failure", data: err }));
						return;
					}

					if(res.ok) {
						dispatch(actions.activateUser({ status: "success", data: user }));
					} else {
						dispatch(actions.activateUser({ status: "failure", data: res.status }));
					}
				});
		};
	},

	changeActiveTab(name) {
		return dispatch => {
			dispatch(actions.changeActiveTab({ data: name }));				
		};
	},

	changeUserActive(user_id, token) {
		return dispatch => {
			request
				.put(`${env.api}/admin/users/edit/status/${user_id}`)
				.set('Authorization', `bearer ${token}`)
				.accept('application/json')
				.end((err, res) => {
					if(err) {
						dispatch(actions.changeUserActive({ status: "failure", data: err }));
						return;
					}

					if(res.ok) {
						dispatch(actions.changeUserActive({ status: "success", data: user_id }));
					} else {
						dispatch(actions.changeUserActive({ status: "failure", data: res.status }));
					}
				});
		};
	},

	deleteUser(user_id, token) {
		return dispatch => {
			request
				.del(`${env.api}/admin/users/delete/${user_id}`)
				.set('Authorization', `bearer ${token}`)
				.accept('application/json')
				.end((err, res) => {
					if(err) {
						dispatch(actions.deleteUser({ status: "failure", data: err }));
						return;
					}

					if(res.ok) {
						dispatch(actions.deleteUser({ status: "success", data: user_id }));
					} else {
						dispatch(actions.deleteUser({ status: "failure", data: res.status }));
					}
				});
		};
	},

	editUser(user, token) {
		console.log(user);
		return dispatch => {
			request
				.put(`${env.api}/admin/users/edit`)
				.set('Authorization', `bearer ${token}`)
				.send({ user: JSON.stringify(user) })
				.accept('application/json')
				.end((err, res) => {
					if(err) {
						dispatch(actions.editUser({ status: "failure", data: err }));
						return;
					}

					let payload = JSON.parse(res.text);

					if(res.ok) {
						dispatch(actions.editUser({ status: "success", data: payload }));
					} else {
						dispatch(actions.editUser({ status: "failure", data: res.status }));
					}
				});
		};
	},

	loadAllInactiveUsers(token) {
		return dispatch => {
			request
				.get(env.api + '/users')
				.set('Authorization', `bearer ${token}`)
				.query("active=0")
				.accept('application/json')
				.end((err, res) => {
					if(err) {
						dispatch(actions.loadAllInactiveUsers({ status: "failure", data: err }));
						return;
					}
					let users = JSON.parse(res.text);
					if(res.ok) {
						dispatch(actions.loadAllInactiveUsers({ status: "success", data: users }));
					} else {
						dispatch(actions.loadAllInactiveUsers({ status: "failure", data: res.status }));
					}
				});
		};
	},

	loadAllUsers(token) {
		return dispatch => {
			request
				.get(env.api + '/users')
				.set('Authorization', `bearer ${token}`)
				.accept('application/json')
				.end((err, res) => {
					if(err) {
						dispatch(actions.loadAllUsers({ status: "failure", data: err }));
						return;
					}
					let users = JSON.parse(res.text);
					if(res.ok) {
						dispatch(actions.loadAllUsers({ status: "success", data: users }));
					} else {
						dispatch(actions.loadAllUsers({ status: "failure", data: res.status }));
					}
				});
		};
	},

	login(user) {
		return dispatch => {
			request
				.post(env.api + '/auth/login')
				.send(user)
				.accept('application/json')
				.end((err, res) => {
					if(err) {
						dispatch(actions.login({ status: "failure", data: err }));
						return;
					}
					let user = JSON.parse(res.text);
					if(res.ok) {
						dispatch(actions.login({ status: "success", data: user }));
					} else {
						dispatch(actions.login({ status: "failure", data: res.status }));
					}
				});
		};
	},

	logout() {
		return dispatch => {
			dispatch(actions.logout({ data: null }));				
		};
	},

	register(user) {
		return dispatch => {
			request
				.post(env.api + '/auth/register')
				.send(user)
				.accept('application/json')
				.end((err, res) => {
					if(err) {
						dispatch(actions.register({ status: "failure", data: err }));
						return;
					}

					if(res.ok) {
						dispatch(actions.register({ status: "success", data: user }));
					} else {
						dispatch(actions.register({ status: "failure", data: res.status }));
					}
				});
		};
	},

	showPopup(name, value) {
		return dispatch => {
			dispatch(actions.showPopup({ data: { name, value } }));				
		};
	},

};

export default userActions;