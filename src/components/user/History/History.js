import React from 'react';
import { Item } from 'semantic-ui-react';
import ReservationList from '../ReservationList/ReservationList';
import { getReservations, postReservation } from '../../../services/reservation';
import { read } from '../../../services/storage';
import Label from 'semantic-ui-react/dist/commonjs/elements/Label/Label';
import { getActiveUser } from '../../../services/user';


class History extends React.Component {
	constructor(args) {
		super(args);
		this.state = {
			res: [],
			nodate: false,
			idsToReserve: [],
			pastRes: [],
			activeUserID: 0
		};
		this.reserve = this.reserve.bind(this);
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
			//show only past and this user's reservations
			this.state.res.forEach(r => {
				var date = r.return_date.split('-');
				var returnDate = new Date(date[0], date[1] - 1, date[2]);

				if (returnDate < Date.now() && r.user_id === this.state.activeUserID) {

					var newArray = this.state.pastRes.slice();
					newArray.push(r);
					this.setState({
						pastRes: newArray
					});
				}
			});
		});
	}

	reserve(items, start, end) {

		if (start.length === 0 || end.length === 0) {
			this.setState({
				nodate: true
			});

		} else {

			// 	OVO RADI SAMO IZ DRUGE ZASTO POJMA
			//	NEMAM ZBILJA NE KUZIM :(

			var newArray = [];

			items.forEach(element => {
				newArray.push(element.id);
				this.setState({
					idsToReserve: newArray
				});

			});

			console.log(this.state.idsToReserve.toString());
			//postReservation(read('token'), this.state.idsToReserve.toString(), start, end);
		}
	}

	render() {
		return (
			<div className="sve">
				{this.state.nodate && alert('enter both dates')}
				<ReservationList reservations={this.state.pastRes} history={true} reserve={this.reserve} />
			</div>
		);
	}
}

export default History;