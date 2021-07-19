export const BASE_URL = 'https://auth.nomoreparties.co';

function checkResponse(res) {
    if (res.status === 200) {
        return res.json();
    }
    return Promise.reject(`${res.status}`);
}

export const register = (password, email) => {
    return fetch(`${BASE_URL}/signup`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body:
            JSON.stringify({ password, email })
    })
        .then((response) => {
            checkResponse(response);
        })
        .then((res) => {
            return res;
        })
};

export const authorize = (password, email) => {
    return fetch(`${BASE_URL}/signin`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ password, email })
    })
        .then((response => checkResponse(response)))
        .then((data) => {
            console.log(data)
            localStorage.setItem('token', data.token);
            return data;
        })
};

export const getContent = () => {
    return fetch(`${BASE_URL}/users/me`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
        }
    })
        .then(res => checkResponse(res))
        .then(data => data)
} 