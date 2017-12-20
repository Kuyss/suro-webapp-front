export function loginUser(email, password) {
    return fetch('http://localhost:8000/api/auth/login', {
        method: 'post',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email, password
        })
    }).then((res) => res.json());

}