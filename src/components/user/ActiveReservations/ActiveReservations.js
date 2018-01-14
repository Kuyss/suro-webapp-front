import React from 'react';
import ReservationList from '../ReservationList/ReservationList';
import { getReservations, deleteReservation } from '../../../services/reservation';
import './ActiveReservations.css';
import { read } from '../../../services/storage';
import { getActiveUser } from '../../../services/user';
import reservationActions from 'actionCreators/reservationActionCreator';
import { connect } from 'react-redux';
import reservationActionCreator from '../../../actionCreators/reservationActionCreator';




class ActiveReservations extends React.Component {

	constructor(args) {
		super(args);
		this.delReservation = this.delReservation.bind(this);
	}



	componentDidMount() {
		this.props.dispatch(reservationActions.getAllReservations(this.props.token));
	}

	delReservation(id) {
		this.props.dispatch(reservationActions.deleteReservation(this.props.token, id));
		
	}

	render() {
		return (
			<div className="sve">
				<ReservationList reservations={this.props.reservations} history={false} del={this.delReservation} />
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
)(ActiveReservations);