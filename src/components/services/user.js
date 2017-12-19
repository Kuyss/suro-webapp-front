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

// export function registerUser(email, password, firstname, lastname) {
//     return fetch('http://localhost:8000/api/auth/register', {
//         method: 'POST',
//         headers: {
//             'content-Type': 'application/x-www-form-urlencoded'
//         },
//         body: JSON.stringify({
//             email: 'nb',
//             password: 'nb',
//             first_name: firstname,
//             last_name: lastname
//         })
//     }).then((res) => {
//         return res.json();
//     });
// }