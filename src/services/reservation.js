export function getReservations(token) {
    return fetch('http://localhost:8000/api/reservations', {
        method: 'get',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }).then((res) => res.json());
}

export function postReservation(token, id, startdate, returndate, ) {
    return fetch('http://localhost:8000/api/reservations/request', {
        method: 'post',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
            'start_date': startdate,
            'return_date': returndate,
            'item_id': [id]
        })
    }).then((res) => res.json());
}