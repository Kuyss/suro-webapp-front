import env from '../util/enviroment';
import * as actions from '../actions/itemActions';

var request = require('superagent');

const itemActions = {

	addDeviceType(deviceType, token) {
		return dispatch => {
			request
				.post(`${env.api}/admin/items/details/create/devicetype`)
				.set('Authorization', `bearer ${token}`)
				.send(deviceType)
				.accept('application/json')
				.end((err, res) => {
					/*if (err) {
						dispatch(actions.deleteDeviceType({ status: "failure", data: err }));
						return;
					}

					if (res.ok) {
						dispatch(actions.deleteDeviceType({ status: "success", data: id }));
					} else {
						dispatch(actions.deleteDeviceType({ status: "failure", data: res.status }));
					}*/
				});
		};
	},

	clearItemReservations() {
		return dispatch => {
			dispatch(actions.clearItemReservations({ data: [] }));				
		};
	},

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

	deleteDeviceType(id, token) {
		return dispatch => {
			request
				.del(`${env.api}/admin/items/details/devicetypes/delete/${id}`)
				.set('Authorization', `bearer ${token}`)
				.accept('application/json')
				.end((err, res) => {
					if (err) {
						dispatch(actions.deleteDeviceType({ status: "failure", data: err }));
						return;
					}

					if (res.ok) {
						dispatch(actions.deleteDeviceType({ status: "success", data: id }));
					} else {
						dispatch(actions.deleteDeviceType({ status: "failure", data: res.status }));
					}
				});
		};
	},

	deleteType(id, token) {
		return dispatch => {
			request
				.del(`${env.api}/admin/items/details/types/delete/${id}`)
				.set('Authorization', `bearer ${token}`)
				.accept('application/json')
				.end((err, res) => {
					if (err) {
						dispatch(actions.deleteType({ status: "failure", data: err }));
						return;
					}

					if (res.ok) {
						dispatch(actions.deleteType({ status: "success", data: id }));
					} else {
						dispatch(actions.deleteType({ status: "failure", data: res.status }));
					}
				});
		};
	},

	deleteSubtype(id, token) {
		return dispatch => {
			request
				.del(`${env.api}/admin/items/details/subtypes/delete/${id}`)
				.set('Authorization', `bearer ${token}`)
				.accept('application/json')
				.end((err, res) => {
					if (err) {
						dispatch(actions.deleteSubtype({ status: "failure", data: err }));
						return;
					}

					if (res.ok) {
						dispatch(actions.deleteSubtype({ status: "success", data: id }));
					} else {
						dispatch(actions.deleteSubtype({ status: "failure", data: res.status }));
					}
				});
		};
	},

	deleteKit(id, token) {
		return dispatch => {
			request
				.del(`${env.api}/admin/items/details/kits/delete/${id}`)
				.set('Authorization', `bearer ${token}`)
				.accept('application/json')
				.end((err, res) => {
					if (err) {
						dispatch(actions.deleteKit({ status: "failure", data: err }));
						return;
					}

					if (res.ok) {
						dispatch(actions.deleteKit({ status: "success", data: id }));
					} else {
						dispatch(actions.deleteKit({ status: "failure", data: res.status }));
					}
				});
		};
	},

	deleteItem(item_id, token) {
		return dispatch => {
			request
				.del(`${env.api}/admin/items/delete/${item_id}`)
				.set('Authorization', `bearer ${token}`)
				.accept('application/json')
				.end((err, res) => {
					if (err) {
						dispatch(actions.deleteItem({ status: "failure", data: err }));
						return;
					}

					if (res.ok) {
						dispatch(actions.deleteItem({ status: "success", data: item_id }));
					} else {
						dispatch(actions.deleteItem({ status: "failure", data: res.status }));
					}
				});
		};
	},

	editItem(item, token) {
		return dispatch => {
			request
				.put(env.api + '/admin/items/edit')
				.set('Authorization', `bearer ${token}`)
				.set('Content-Type', 'application/json')
				.send({ item: JSON.stringify(item) })
				.accept('application/json')
				.end((err, res) => {
					if (err) {
						dispatch(actions.editItem({ status: "failure", data: err }));
						return;
					}

					let newItem = JSON.parse(res.text);

					if (res.ok) {
						dispatch(actions.editItem({ status: "success", data: newItem }));
					} else {
						dispatch(actions.editItem({ status: "failure", data: res.status }));
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

	getReservationHistory(item_id, token) {
		return dispatch => {
			request
				.get(env.api + `/reservations/item/${item_id}`)
				.set('Authorization', `bearer ${token}`)
				.accept('application/json')
				.end((err, res) => {
					if (err) {
						dispatch(actions.getReservationHistory({ status: "failure", data: err }));
						return;
					}
					let item = JSON.parse(res.text);
					let itemReservations = item[0] ? item[0].reservations : [];
					if (res.ok) {
						dispatch(actions.getReservationHistory({ status: "success", data: itemReservations }));
					} else {
						dispatch(actions.getReservationHistory({ status: "failure", data: res.status }));
					}
				});
		};
	},

	resetLoadingFlag() {
		return dispatch => {
			dispatch(actions.resetLoadingFlag({ data: true }));				
		};
	},

	uploadFile(file, token) {
		return dispatch => {
			request
				.post(env.api + '/admin/items/create/file')
				.set('Authorization', `bearer ${token}`)
				.send(file)
				.end((err, res) => {
					if (err) {
						console.log(err);
						return;
					}

					if (res.ok) {
						console.log("ok");
					} else {
						console.log(res);
					}
				});
		};
	},

	setCurrentItem(id){
		return dispatch => {
		dispatch(actions.setCurrentItem({status: "success", data: id}));
		}
	}


};

export default itemActions;