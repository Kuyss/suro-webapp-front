export function getItems(token) {
    return fetch('http://localhost:8000/api/items', {
        method: 'get',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }).then((res) => res.json());
}