export function save(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}

export function read(key) {
    return JSON.parse(localStorage.getItem(key));
}  