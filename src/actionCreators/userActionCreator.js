import env from '../util/enviroment'; 
import * as actions from '../actions/userActions';

var request = require('superagent');

const userActions = {

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