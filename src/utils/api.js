class Api {
    constructor(options) {
        this._address = options.baseUrl;
        this._token = options.headers;
    }

    _checkResponse(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`${res.status}`);
    }
    getCards() {
        return fetch(`${this._address}/cards`, {
            headers: this._token
        })
            .then(this._checkResponse) 
    }
    getUserInfo() {
        return fetch(`${this._address}/users/me`, {
            headers: this._token,
        
        })
            .then(this._checkResponse)
    }
    changeUserInfo(user) {
        return fetch(`${this._address}/users/me`,  {
            method: 'PATCH',
            headers: this._token,
            
            body: JSON.stringify({
                name: user.name,
                about: user.about
            })
                
        }).then(this._checkResponse)
    }
    addNewCard(card) {
        return fetch(`${this._address}/cards`, {
            method: 'POST',
            headers: this._token,

            body: JSON.stringify({
                name: card.name,
                link: card.link
            })

        }).then(this._checkResponse)
    }
    changeProfilePhoto(data) {
        return fetch(`${this._address}/users/me/avatar`, {
            method: 'PATCH',
            headers: this._token,

            body: JSON.stringify({
                avatar: data.avatar
            })

        }).then(this._checkResponse)
    }
    deleteCard(id) {
        return fetch(`${this._address}/cards/${id}`, {
            method: 'DELETE',
            headers: this._token,
            
        }).then(this._checkResponse)
    }
    // like(id) {
    //     return fetch(`${this._address}/cards/likes/${id}`, {
    //         method: 'PUT',
    //         headers: this._token,

    //     }).then(this._checkResponse)
    // }
    // dislike(id) {
    //     return fetch(`${this._address}/cards/likes/${id}`, {
    //         method: 'DELETE',
    //         headers: this._token,

    //     }).then(this._checkResponse)
    // }
    changeLikeCardStatus(id, isLiked) {
        return fetch(`${this._address}/cards/likes/${id}`, {
            method: isLiked ? "DELETE" : "PUT",
            headers: this._token,

        }).then(this._checkResponse)
    }
}
const api = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-24',
    headers: {
        authorization: '4f373d74-bd3f-4a56-8098-6fb64502e0a9',
        'Content-Type': 'application/json'
    }
})
export default api;