import React from 'react';
import ReservationList from '../ReservationList/ReservationList';
import { getReservations, deleteReservation } from '../../../services/reservation';
import './ActiveReservations.css';
import { read } from '../../../services/storage';
import { getActiveUser } from '../../../services/user';

class ActiveReservations extends React.Component {

	constructor(args) {
		super(args);
		this.state = {
			res: [],
			activeRes: [],
			activeUserID: 0
		};
	}

	componentWillMount() {
		getActiveUser(read('token')).then((result) => this.setState({
			activeUserID: result
		}));

		getReservations(read('token')).then((resp) => {
			this.setState({
				res: resp
			});
		}).then(() => {
			//show only active and this user's reservations
			this.state.res.forEach(r => {
				var date = r.return_date.split('-');
				var returnDate = new Date(date[0], date[1] - 1, date[2]);
				if (returnDate >= Date.now() && r.user_id === this.state.activeUserID) {

					var newArray = this.state.activeRes.slice();
					newArray.push(r);
					this.setState({
						activeRes: newArray
					});
				}
			});
		});
	}

	delReservation(id) {
		deleteReservation(id, read('token'));
	}

	render() {
		return (
			<div className="sve">
				<ReservationList reservations={this.state.activeRes} history={false} del={this.delReservation} />
			</div>
		);
	}
}

export default ActiveReservations;