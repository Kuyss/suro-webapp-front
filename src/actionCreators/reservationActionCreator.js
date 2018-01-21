import env from '../util/enviroment'; 
import * as actions from '../actions/reservationActions';

var request = require('superagent');

const reservationActions = {

	approveReservation(reservation_id, token) {
		return dispatch => {
			request
                .post(env.api + '/admin/reservations/approve')
                .set('Authorization', `bearer ${token}`)
                .send({ id: reservation_id })
				.accept('application/json')
				.end((err, res) => {
					if(err) {
						dispatch(actions.approveReservation({ status: "failure", data: err }));
						return;
					}

					if(res.ok) {
						dispatch(actions.approveReservation({ status: "success", data: reservation_id }));
					} else {
						dispatch(actions.approveReservation({ status: "failure", data: res.status }));
					}
				});
		};
	},

	declineReservation(reservation_id, token) {
		return dispatch => {
			request
                .post(env.api + '/admin/reservations/decline')
                .set('Authorization', `bearer ${token}`)
                .send({ id: reservation_id, remark: "Odbijeno" })
				.accept('application/json')
				.end((err, res) => {
					if(err) {
						dispatch(actions.declineReservation({ status: "failure", data: err }));
						return;
					}

					if(res.ok) {
						dispatch(actions.declineReservation({ status: "success", data: reservation_id }));
					} else {
						dispatch(actions.declineReservation({ status: "failure", data: res.status }));
					}
				});
		};
	},

	adminDeleteReservation(reservation_id, type, token) {
		return dispatch => {
			request
                .del(`${env.api}/admin/reservations/delete/${reservation_id}`)
                .set('Authorization', `bearer ${token}`)
				.accept('application/json')
				.end((err, res) => {
					if(err) {
						dispatch(actions.adminDeleteReservation({ status: "failure", data: err }));
						return;
					}

					if(res.ok) {
						dispatch(actions.adminDeleteReservation({ status: "success", data: { reservation_id, type } }));
					} else {
						dispatch(actions.adminDeleteReservation({ status: "failure", data: res.status }));
					}
				});
		};
	},

	adminExtendReservation(extend_id, token) {
		return dispatch => {
			request
                .post(env.api + '/admin/reservations/extend')
                .set('Authorization', `bearer ${token}`)
                .send({ id: extend_id })
				.accept('application/json')
				.end((err, res) => {
					if(err) {
						dispatch(actions.adminExtendReservation({ status: "failure", data: err }));
						return;
					}

					if(res.ok) {
						dispatch(actions.adminExtendReservation({ status: "success", data: extend_id }));
					} else {
						dispatch(actions.adminExtendReservation({ status: "failure", data: res.status }));
					}
				});
		};
	},


	getAllReservations(token) {
		return dispatch => {
			request
                .get(env.api + '/reservations')
                .set('Authorization', `bearer ${token}`)
				.accept('application/json')
				.end((err, res) => {
					if(err) {
						dispatch(actions.getAllReservations({ status: "failure", data: err }));
						return;
					}
					let reservations = JSON.parse(res.text);
					if(res.ok) {
						dispatch(actions.getAllReservations({ status: "success", data: reservations }));
					} else {
						dispatch(actions.getAllReservations({ status: "failure", data: res.status }));
					}
				});
		};
	},

	getActiveUsersReservations(token, id) {
		return dispatch => {
			request
                .get(env.api + `/reservations/user/${id}`)
                .set('Authorization', `bearer ${token}`)
				.accept('application/json')
				.end((err, res) => {
					if(err) {
						dispatch(actions.getActiveUsersReservations({ status: "failure", data: err }));
						return;
					}
					let activeUserReservations = JSON.parse(res.text);

					if(res.ok) {
						dispatch(actions.getActiveUsersReservations({ status: "success", data: activeUserReservations }));
					} else {
						dispatch(actions.getActiveUsersReservations({ status: "failure", data: res.status }));
					}
				});
		};
	},

	getReservationsToExtend(token) {
		return dispatch => {
			request
                .get(env.api + '/admin/reservations/extends')
                .set('Authorization', `bearer ${token}`)
				.accept('application/json')
				.end((err, res) => {
					if(err) {
						dispatch(actions.getReservationsToExtend({ status: "failure", data: err }));
						return;
					}
					let reservations = JSON.parse(res.text);
					if(res.ok) {
						dispatch(actions.getReservationsToExtend({ status: "success", data: reservations }));
					} else {
						dispatch(actions.getReservationsToExtend({ status: "failure", data: res.status }));
					}
				});
		};
	},

	postReservation(token, id, startdate, returndate){
		return dispatch => {
			request
				.post(env.api + '/reservations/request')
                .set('Authorization', `bearer ${token}`)
				.accept('application/json')
				.send({
					'item_id': `[${id}]`,
					'start_date': startdate,
					'return_date': returndate
				})
				.end((err, res) => {
					if(err) {
						console.log(err);
						return;
					}
				});
		};
	},

	refuseReservation(extend_id, reason, token) {
		return dispatch => {
			request
                .post(env.api + '/admin/reservations/extend/refuse')
                .set('Authorization', `bearer ${token}`)
                .send({ id: extend_id, reason })
				.accept('application/json')
				.end((err, res) => {
					if(err) {
						dispatch(actions.refuseReservation({ status: "failure", data: err }));
						return;
					}

					if(res.ok) {
						dispatch(actions.refuseReservation({ status: "success", data: extend_id }));
					} else {
						dispatch(actions.refuseReservation({ status: "failure", data: res.status }));
					}
				});
		};
	},

	returnReservation(reservation_id, token) {
		return dispatch => {
			request
                .post(env.api + '/admin/reservations/return')
                .set('Authorization', `bearer ${token}`)
                .send({ id: reservation_id })
				.accept('application/json')
				.end((err, res) => {
					if(err) {
						dispatch(actions.returnReservation({ status: "failure", data: err }));
						return;
					}

					if(res.ok) {
						dispatch(actions.returnReservation({ status: "success", data: reservation_id }));
					} else {
						dispatch(actions.returnReservation({ status: "failure", data: res.status }));
					}
				});
		};
	},

	extendReservation(token, id, returndate, reason){
		return dispatch => {
			request
				.post(env.api + '/reservations/extend')
                .set('Authorization', `bearer ${token}`)
				.accept('application/json')
				.send({
					'reservation_id': `[${id}]`,
					'new_return_date': returndate,
					'reason': reason
				})
				.end((err, res) => {
					if(err) {
						console.log(err);
						return;
					}
				});
		};
	},

	deleteReservation(token, id){
		return dispatch => {
			request
				.post(env.api + `/reservations/delete/${id}`)
                .set('Authorization', `bearer ${token}`)
				.accept('application/json')
				.end((err, res) => {
					if(err) {
						dispatch(actions.deleteReservation({ status: "failure", data: err }));
						console.log(err);
						return;
					}

					if(res.ok) {
						dispatch(actions.deleteReservation({ status: "success", data: id }));
					} else {
						dispatch(actions.deleteReservation({ status: "failure", data: res.status }));
					}
				});
		};
	}

	

	

};

export default reservationActions;