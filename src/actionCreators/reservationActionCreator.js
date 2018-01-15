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

	deleteReservation(token, id){
		return dispatch => {
			request
				.post(env.api + `/reservations/delete/${id}`)
                .set('Authorization', `bearer ${token}`)
				.accept('application/json')
				.end((err, res) => {
					if(err) {
						dispatch(actions.deleteReservation({ status: "failure", data: err }));
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