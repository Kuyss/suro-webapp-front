import React from 'react';
import Reservation from '../Reservation/Reservation.js';

export default class ReservationList extends React.Component {

    render() {
        return (<div>
            {
                this.props.reservations.map((reservation) => <Reservation reservation={reservation} his={this.props.history} del={this.props.del} res={this.props.reserve} ext={this.props.ext}/>)
            }
        </div>);
    }

}