export function loginUser(email, password) {
    return fetch('http://localhost:8000/api/auth/login', {
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
    return fetch('http://localhost:8000/api/auth/register', {
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