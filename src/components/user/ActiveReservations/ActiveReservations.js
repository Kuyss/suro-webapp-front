import React from 'react';
import ReservationList from '../ReservationList/ReservationList';
import './ActiveReservations.css';
import reservationActions from 'actionCreators/reservationActionCreator';
import userActions from '../../../actionCreators/userActionCreator';
import { connect } from 'react-redux';
import reservationActionCreator from '../../../actionCreators/reservationActionCreator';
import NotFound from 'components/NotFound';
import { ROLES } from 'util/constants';


class ActiveReservations extends React.Component {

	constructor(args) {
		super(args);
		this.delReservation = this.delReservation.bind(this);
		this.extendRes = this.extendRes.bind(this);
	}



	componentDidMount() {
		if (this.props.token)
			this.props.dispatch(reservationActions.getActiveUsersReservations(this.props.token, this.props.currentUser.id));

	}

	delReservation(id) {
		this.props.dispatch(reservationActions.deleteReservation(this.props.token, id));
	}

	extendRes(id, end, reason) {
		if (reason.length == 0)
			this.props.dispatch(reservationActions.extendReservation(this.props.token, id, end.toString()));
		else
			this.props.dispatch(reservationActions.extendReservation(this.props.token, id, end.toString(), reason));
	}

	render() {
		if (this.props.role !== ROLES.USER) {
			return <NotFound />
		} else {
			return (
				<div className="sve">
					{<ReservationList reservations={this.props.reservations} history={false} del={this.delReservation} ext={this.extendRes} />}
				</div>
			);
		}
	}


}

const mapStateToProps = (state) => {
	return {
		role: state.users.currentUserRole,
		reservations: state.reservations.activeUsersReservationList,
		token: state.users.token,
		currentUser: state.users.currentUser
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