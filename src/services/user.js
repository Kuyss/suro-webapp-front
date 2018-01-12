import { API_BASE } from '../util/constants';

export function loginUser(email, password) {
    return fetch(`${API_BASE}/auth/login`, {
        method: 'post',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email,
            password
        })
    }).then((res) => res.json());

}

export function registerUser(email, password, first_name, last_name) {
    return fetch(`${API_BASE}/auth/register`, {
        method: 'post',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email,
            password,
            first_name,
            last_name
        })
    }).then((res) => res.json());
}

export function getActiveUser(token) {
    return fetch(`${API_BASE}/users/current`, {
        method: 'get',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }).then((res) => res.json()).then((r)=> r.id)
        .catch((error) => {
            console.log(error);
        });
}