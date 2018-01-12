import { API_BASE } from '../util/constants';

export function loginUser(email, password) {
<<<<<<< HEAD
    return fetch('http://159.89.108.135/api/auth/login', {
=======
    return fetch(`${API_BASE}/auth/login`, {
>>>>>>> 27e34061028b9a6840ac7199028abbf53601cd0a
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
<<<<<<< HEAD
    return fetch('http://159.89.108.135/api/auth/register', {
=======
    return fetch(`${API_BASE}/auth/register`, {
>>>>>>> 27e34061028b9a6840ac7199028abbf53601cd0a
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
<<<<<<< HEAD
    return fetch('http://159.89.108.135/api/users/current', {
=======
    return fetch(`${API_BASE}/users/current`, {
>>>>>>> 27e34061028b9a6840ac7199028abbf53601cd0a
        method: 'get',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }).then((res) => res.json()).then((r)=> r.id)
        .catch((error) => {
            console.log(error);
        });
}