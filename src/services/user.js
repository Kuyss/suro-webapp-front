export function loginUser(email, password) {
    return fetch('http://159.89.108.135/api/auth/login', {
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
    return fetch('http://159.89.108.135/api/auth/register', {
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
    return fetch('http://159.89.108.135/api/users/current', {
        method: 'get',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }).then((res) => res.json()).then((r)=> r.id)
        .catch((error) => {
            console.log(error);
        });
}