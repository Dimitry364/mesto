export default class Api {
    constructor(options) {
        this._baseUrl = options.baseUrl;
        this._headers = options.headers;
    }

    getUser() {
        return fetch(this._baseUrl + '/users/me', {
            method: 'GET',
            headers: this._headers
        })
            .then(res => {
                return this._checkResponse(res);
            });
    }

    setUser({ name, about }) {
        return fetch(this._baseUrl + '/users/me', {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                name: name,
                about: about
            })
        })
            .then(res => {
                return this._checkResponse(res);
            });
    }

    updateAvatar(avatarSrc) {
        return fetch(this._baseUrl + '/users/me/avatar', {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                avatar: avatarSrc
            })
        })
            .then(res => {
                return this._checkResponse(res);
            });
    }

    addCard({ name, link }) {
        return fetch(this._baseUrl + '/cards', {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({
                name: name,
                link: link
            })
        })
            .then(res => {
                return this._checkResponse(res);
            });
    }

    likeCard(id, isLiked) {
        return fetch(this._baseUrl + '/cards/likes/' + id, {
            method: isLiked ? 'DELETE' : 'PUT',
            headers: this._headers
        })
            .then(res => {
                return this._checkResponse(res);
            });
    }

    deleteCard(id) {
        return fetch(this._baseUrl + '/cards/' + id, {
            method: 'DELETE',
            headers: this._headers
        })
            .then(res => {
                return this._checkResponse(res);
            });
    }

    getInitialCards() {
        return fetch(this._baseUrl + '/cards', {
            method: 'GET',
            headers: this._headers
        })
            .then(res => {
                return this._checkResponse(res);
            });
    }

    _checkResponse(res) {
        if (res.ok)
            return res.json();

        return Promise.reject(`Ошибка: ${res.status}`);
    }
}