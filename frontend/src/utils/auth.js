export const BASE_URL = 'https://api.dariaovchmesto.students.nomoredomains.icu/';

export const checkResponse = (res) => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);

export const register = (email, password) => {
    return fetch(`${BASE_URL}signup`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({email, password})
        })
        .then(checkResponse)
};

export const login = (email, password) => {
    return fetch(`${BASE_URL}signin`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({email, password})
        })
        .then(checkResponse)
};

export const getContent = (token) => {
    return fetch (`${BASE_URL}users/me`, {
            headers: {
                authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        })
        .then(checkResponse)
};