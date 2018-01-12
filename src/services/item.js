export function getItems(token) {
    return fetch('http://159.89.108.135/api/items', {
        method: 'get',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }).then((res) => res.json());
}