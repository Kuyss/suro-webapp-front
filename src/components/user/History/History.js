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
import { ROLES } from 'util/constants';
import NotFound from 'components/NotFound';

class History extends React.Component {
	constructor(args) {
		super(args);
		this.state = {
			nodate: false,
			idsToReserve: []
		};
		this.reserve = this.reserve.bind(this);
	}



	componentDidMount() {
		if(this.props.token)
			this.props.dispatch(reservationActions.getActiveUsersReservations(this.props.token, this.props.currentUser.id));
	}

	reserve(items) {

		var start = this.start.value;
		var end =  this.end.value;

		if (start.length === 0 || end.length === 0) {
			this.setState({
				nodate: true
			});

		} else {

			var newArray = [];

			items.forEach(element => {
				newArray.push(element.item_id);
				this.setState({
					idsToReserve: newArray
				});

			});

			console.log(this.state.idsToReserve.toString());
			//this.props.dispatch(reservationActions.postReservation(this.props.token, this.state.idsToReserve.toString(), start, end));
		}
	}

	render() {
		if(this.props.role !== ROLES.USER) {
			return <NotFound />
		} else {
			return (
				<div className="sve">

					<div className="grey">
						<div><h3>New starting date</h3>
							<div className="ui calendar" id="example1">
								<div className="ui input left icon">
									<i className="calendar icon"></i>
									<input type="text" placeholder="startdate" ref={(input) => {
										this.start = input;
									}} />
								</div>
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


					</div>

					{this.state.nodate && <Label pointing>Enter both dates</Label>}
					<ReservationList reservations={this.props.reservations} history={true} reserve={this.reserve} />
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
)(History);