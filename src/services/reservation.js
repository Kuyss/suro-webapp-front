export function getReservations(token) {
    return fetch('http://localhost:8000/api/reservations', {
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

    return fetch('http://localhost:8000/api/reservations/request', {
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
    return fetch(`http://localhost:8000/api/reservations/delete/${id}`, {
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