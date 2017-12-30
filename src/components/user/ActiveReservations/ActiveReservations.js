import React from 'react';
import ReservationList from '../ReservationList/ReservationList';
import { getReservations, deleteReservation } from '../../../services/reservation';
import './ActiveReservations.css';
import { read } from '../../../services/storage';

class ActiveReservations extends React.Component {

	constructor(args) {
		super(args);
		this.state = {
			res: []
		};
	}

	componentWillMount() {
		getReservations(read('token')).then((resp) => {
			this.setState({
				res: resp
			});
		})
	}

	delReservation(id){
		deleteReservation(id, read('token'));
	}

	render() {
		return (
			<div className="sve">
				<ReservationList reservations={this.state.res} extend={false} del={this.delReservation}/>
			</div>
		);
	}
}

export default ActiveReservations;