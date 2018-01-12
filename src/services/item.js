import { API_BASE } from '../util/constants';

export function getItems(token) {
<<<<<<< HEAD
    return fetch('http://159.89.108.135/api/items', {
=======
    return fetch(`${API_BASE}/items`, {
>>>>>>> 27e34061028b9a6840ac7199028abbf53601cd0a
        method: 'get',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }).then((res) => res.json());
}