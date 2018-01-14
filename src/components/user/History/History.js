import React from 'react';
import { Item } from 'semantic-ui-react';
import ReservationList from '../ReservationList/ReservationList';
import { getReservations, postReservation } from '../../../services/reservation';
import { read } from '../../../services/storage';
import Label from 'semantic-ui-react/dist/commonjs/elements/Label/Label';
import { getActiveUser } from '../../../services/user';
import reservationActions from 'actionCreators/reservationActionCreator';
import { connect } from 'react-redux';



class History extends React.Component {
	constructor(args) {
		super(args);
		this.state = {
			nodate: false,
			idsToReserve: [],
			pastRes: []
		};
		this.reserve = this.reserve.bind(this);
	}



	componentDidMount() {
		this.props.dispatch(reservationActions.getAllReservations(this.props.token));


		//show only past and this user's reservations

		// this.props.reservations.forEach(r => {
		// 	var date = r.return_date.split('-');
		// 	var returnDate = new Date(date[0], date[1] - 1, date[2]);

		// 	if (returnDate < Date.now()) {

		// 		var newArray = this.state.pastRes.slice();
		// 		newArray.push(r);
		// 		this.setState({
		// 			pastRes: newArray
		// 		});
		// 	}
		// });
	}

	reserve(items, start, end) {

		if (start.length === 0 || end.length === 0) {
			this.setState({
				nodate: true
			});

		} else {

			var newArray = [];

			items.forEach(element => {
				newArray.push(element.id);
				this.setState({
					idsToReserve: newArray
				});

			});

			console.log(this.state.idsToReserve.toString());
			//this.props.dispatch(reservationActions.postReservation(this.props.token, this.state.idsToReserve.toString(), start, end));
		}
	}

	render() {
		return (
			<div className="sve">
				{this.state.nodate && <Label pointing>Enter both dates</Label>}
				<ReservationList reservations={this.props.reservations} history={true} reserve={this.reserve} />
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		reservations: state.reservations.reservationList,
		token: state.users.token

	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		dispatch
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(History);