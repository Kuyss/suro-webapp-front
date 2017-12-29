import React from 'react';
import { Item } from 'semantic-ui-react';
import ReservationList from '../ReservationList/ReservationList';
import { getReservations } from '../../../services/reservation';
import { read } from '../../../services/storage';


class History extends React.Component {
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

	render() {
		return (
			<div className="sve">
				<ReservationList reservations={this.state.res} history={true} />
			</div>
		);
	}
}

export default History;