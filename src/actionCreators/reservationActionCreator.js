import env from '../util/enviroment'; 
import * as actions from '../actions/reservationActions';

var request = require('superagent');

const reservationActions = {


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
						console.log(err);
						return;
					}
				});
		};
	}

	

	

};

export default reservationActions;