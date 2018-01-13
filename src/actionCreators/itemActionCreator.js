import env from '../util/enviroment';
import * as actions from '../actions/itemActions';

var request = require('superagent');

const itemActions = {


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


};

export default itemActions;