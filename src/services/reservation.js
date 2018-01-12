import { API_BASE } from '../util/constants';

export function getReservations(token) {
<<<<<<< HEAD
    return fetch('http://159.89.108.135/api/reservations', {
=======
    return fetch(`${API_BASE}/reservations`, {
>>>>>>> 27e34061028b9a6840ac7199028abbf53601cd0a
        method: 'get',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }).then((res) => res.json())
        .catch((error) => {
            console.log(error);
        });
}

export function postReservation(token, id, startdate, returndate) {

<<<<<<< HEAD
    return fetch('http://159.89.108.135/api/reservations/request', {
=======
    return fetch(`${API_BASE}/reservations/request`, {
>>>>>>> 27e34061028b9a6840ac7199028abbf53601cd0a
        method: 'post',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
            'item_id': `[${id}]`,
            'start_date': startdate,
            'return_date': returndate
        })
    }).catch((error) => {
        console.log(error);
    });
}

export function deleteReservation(id, token) {
<<<<<<< HEAD
    return fetch(`http://159.89.108.135/api/reservations/delete/${id}`, {
=======
    return fetch(`${API_BASE}/reservations/delete/${id}`, {
>>>>>>> 27e34061028b9a6840ac7199028abbf53601cd0a
        method: 'post',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    }).catch((error) => {
        console.log(error);
    });
}