import env from '../util/enviroment';
import * as actions from '../actions/itemActions';

var request = require('superagent');

const itemActions = {

	createItem(item, token) {
		return dispatch => {
			request
				.post(env.api + '/admin/items/create')
				.set('Authorization', `bearer ${token}`)
				.send(item)
				.accept('application/json')
				.end((err, res) => {
					if (err) {
						dispatch(actions.createItem({ status: "failure", data: err }));
						return;
					}

					if (res.ok) {
						dispatch(actions.createItem({ status: "success", data: true }));
					} else {
						dispatch(actions.createItem({ status: "failure", data: res.status }));
					}
				});
		};
	},

	getAllDeviceTypes(token) {
		return dispatch => {
			request
				.get(env.api + '/items/details/devicetypes')
				.set('Authorization', `bearer ${token}`)
				.accept('application/json')
				.end((err, res) => {
					if (err) {
						dispatch(actions.getAllDeviceTypes({ status: "failure", data: err }));
						return;
					}
					let deviceTypes = JSON.parse(res.text);
					if (res.ok) {
						dispatch(actions.getAllDeviceTypes({ status: "success", data: deviceTypes }));
					} else {
						dispatch(actions.getAllDeviceTypes({ status: "failure", data: res.status }));
					}
				});
		};
	},


	getAllItems(token) {
		return dispatch => {
			request
				.get(env.api + '/items')
				.set('Authorization', `bearer ${token}`)
				.accept('application/json')
				.end((err, res) => {
					if (err) {
						dispatch(actions.getAllItems({ status: "failure", data: err }));
						return;
					}
					let items = JSON.parse(res.text);
					if (res.ok) {
						dispatch(actions.getAllItems({ status: "success", data: items }));
					} else {
						dispatch(actions.getAllItems({ status: "failure", data: res.status }));
					}
				});
		};
	},

	getAllKits(token) {
		return dispatch => {
			request
				.get(env.api + '/items/details/kits')
				.set('Authorization', `bearer ${token}`)
				.accept('application/json')
				.end((err, res) => {
					if (err) {
						dispatch(actions.getAllKits({ status: "failure", data: err }));
						return;
					}
					let kits = JSON.parse(res.text);
					if (res.ok) {
						dispatch(actions.getAllKits({ status: "success", data: kits }));
					} else {
						dispatch(actions.getAllKits({ status: "failure", data: res.status }));
					}
				});
		};
	},

	getAllSubtypes(token) {
		return dispatch => {
			request
				.get(env.api + '/items/details/subtypes')
				.set('Authorization', `bearer ${token}`)
				.accept('application/json')
				.end((err, res) => {
					if (err) {
						dispatch(actions.getAllSubtypes({ status: "failure", data: err }));
						return;
					}
					let subtypes = JSON.parse(res.text);
					if (res.ok) {
						dispatch(actions.getAllSubtypes({ status: "success", data: subtypes }));
					} else {
						dispatch(actions.getAllSubtypes({ status: "failure", data: res.status }));
					}
				});
		};
	},

	getAllTypes(token) {
		return dispatch => {
			request
				.get(env.api + '/items/details/types')
				.set('Authorization', `bearer ${token}`)
				.accept('application/json')
				.end((err, res) => {
					if (err) {
						dispatch(actions.getAllTypes({ status: "failure", data: err }));
						return;
					}
					let types = JSON.parse(res.text);
					if (res.ok) {
						dispatch(actions.getAllTypes({ status: "success", data: types }));
					} else {
						dispatch(actions.getAllTypes({ status: "failure", data: res.status }));
					}
				});
		};
	},

	getItemStatus(token, id) {
		return dispatch => {
			request
				.get(env.api + `/items/status/${id}`)
				.set('Authorization', `bearer ${token}`)
				.accept('application/json')
				.end((err, res) => {
					if (err) {
						dispatch(actions.getItemStatus({ status: "failure", data: err }));
						return;
					}
					let itemStatus = JSON.parse(res.text);
					if (res.ok) {
						dispatch(actions.getItemStatus({ status: "success", data: itemStatus }));
					} else {
						dispatch(actions.getItemStatus({ status: "failure", data: res.status }));
					}
				});
		};
	},


};

export default itemActions;