import { API_BASE } from '../util/constants';

export function getItems(token) {
    return fetch(`${API_BASE}/items`, {
        method: 'get',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }).then((res) => res.json());
}