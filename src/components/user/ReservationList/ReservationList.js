import React from 'react';
import Reservation from '../Reservation/Reservation.js';

const ReservationList = ({ reservations }) => (
    <div>
        {
            reservations.map((reservation) => <Reservation reservation={reservation} />)
        }
    </div>
);

export default ReservationList;