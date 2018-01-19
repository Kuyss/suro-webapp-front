import React from 'react';
import { Item } from 'semantic-ui-react';
import ReservationList from '../ReservationList/ReservationList';
import { getReservations, postReservation } from '../../../services/reservation';
import { read } from '../../../services/storage';
import Label from 'semantic-ui-react/dist/commonjs/elements/Label/Label';
import { getActiveUser } from '../../../services/user';
import reservationActions from 'actionCreators/reservationActionCreator';
import { connect } from 'react-redux';
import Button from 'semantic-ui-react/dist/commonjs/elements/Button/Button';
import './History.css';
import Segment from 'semantic-ui-react/dist/commonjs/elements/Segment/Segment';


class History extends React.Component {
	constructor(args) {
		super(args);
		this.state = {
			nodate: false,
			noitems: false,
			clicked: [],
			idsToReserve: []
		};
		this.addToState = this.addToState.bind(this);
	}



	componentDidMount() {
		this.props.dispatch(reservationActions.getActiveUsersReservations(this.props.token, this.props.currentUser.id));

	}

	cancel() {
		this.setState({
			idsToReserve: [],
			clicked: []
		});

		this.start.value = '';
		this.end.value = '';
	}

	addToState(items) {

		var newArray = [];

		items.forEach(element => {
			newArray.push(element.item_id);
			this.setState({
				idsToReserve: newArray
			});

		});

	}


	renew(start, end) {
		if (start.length === 0 || end.length === 0) {
			this.setState({
				nodate: true
			});

		} else if (this.state.idsToReserve.length == 0) {
			this.setState({
				noitems: true
			});
		} else {
			this.props.dispatch(reservationActions.postReservation(this.props.token, this.state.idsToReserve.toString(), start, end));
			this.cancel();
		}
	}


	render() {
		return (
			<div className="sve">

				<div className="reserv">
					<h2>Renew old reservation</h2>
					<Segment>{this.state.idsToReserve.length} items in reservation: [{this.state.idsToReserve.toString()}]</Segment>
					<h3>New starting date</h3>
					<div className="ui calendar" id="example1">
						<div className="ui input left icon">
							<i className="calendar icon"></i>
							<input type="text" placeholder="startdate" ref={(input) => {
								this.start = input;
							}} />
						</div>
					</div>
					<h3>New return date</h3>
					<div className="ui calendar" id="example1">
						<div className="ui input left icon">
							<i className="calendar icon"></i>
							<input type="text" placeholder="returndate" ref={(input) => {
								this.end = input;
							}} />
						</div>
					</div>
					{(this.state.nodate || this.state.noitems) && <div class="ui pointing red basic label">Enter both dates and items</div>}
					<Button style={{ 'margin-left': 400 }} onClick={() => this.cancel()}>Cancel</Button>
					<Button color='grey' onClick={() => this.renew(this.start.value, this.end.value)}>Renew reservation</Button>
				</div>

				<ReservationList reservations={this.props.reservations} history={true} reserve={this.addToState} />
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
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
)(History);