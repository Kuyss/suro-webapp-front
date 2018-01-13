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
			res: [],
			nodate: false,
			idsToReserve: [],
			pastRes: [],
			activeUserID: 0
		};
		this.reserve = this.reserve.bind(this);
	}

	

	componentDidMount(){
		this.props.dispatch(reservationActions.getAllReservations(this.props.token));
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
			//postReservation(read('token'), this.state.idsToReserve.toString(), start, end);
		}
	}

	render() {
		return (
			<div className="sve">
				{this.state.nodate && alert('enter both dates')}
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