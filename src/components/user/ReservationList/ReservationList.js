import React from 'react';
import Reservation from '../Reservation/Reservation.js';

const ReservationList = ({ reservations, history }) => (
    <div>
        {
            reservations.map((reservation) => <Reservation reservation={reservation} his={history}/>)
        }
    </div>
);

export default ReservationList;