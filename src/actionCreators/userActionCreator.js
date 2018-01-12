import env from '../util/enviroment'; 
import * as actions from '../actions/userActions';

var request = require('superagent');

const userActions = {

	changeActiveTab(name) {
		return dispatch => {
			dispatch(actions.changeActiveTab({ data: name }));				
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