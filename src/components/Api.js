export default class Api {
    constructor(options) {
        this._baseUrl = options.baseUrl;
        this._headers = options.headers;
    }

    getInitialData() {
        return Promise.all([this.getUser(), this.getInitialCards()]);
    }

    getUser() {
        return this._request(this._baseUrl + '/users/me', {
            method: 'GET',
            headers: this._headers
        });
    }

    setUser({ name, about }) {
        return this._request(this._baseUrl + '/users/me', {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                name: name,
                about: about
            })
        });
    }

    updateAvatar(avatarSrc) {
        return this._request(this._baseUrl + '/users/me/avatar', {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                avatar: avatarSrc
            })
        });
    }

    addCard({ name, link }) {
        return this._request(this._baseUrl + '/cards', {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({
                name: name,
                link: link
            })
        });
    }

    likeCard(id, isLiked) {
        return this._request(this._baseUrl + '/cards/likes/' + id, {
            method: isLiked ? 'DELETE' : 'PUT',
            headers: this._headers
        });
    }

    deleteCard(id) {
        return this._request(this._baseUrl + '/cards/' + id, {
            method: 'DELETE',
            headers: this._headers
        });
    }

    getInitialCards() {
        return this._request(this._baseUrl + '/cards', {
            method: 'GET',
            headers: this._headers
        });
    }

    _request(url, options) {
        return fetch(url, options).then(this._checkResponse)
    }

    _checkResponse(res) {
        if (res.ok)
            return res.json();

        return Promise.reject(`Ошибка: ${res.status}`);
    }
}