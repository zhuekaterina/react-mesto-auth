import { apiInfo } from './utils.js';

class Api {
    constructor({baseUrl, headers}) {
        this._baseUrl = baseUrl;
        this._headers = headers;
    }

    getResStatus(res) {
        if (res.ok) {
            return res.json();
          }
          return Promise.reject(`Ошибка: ${res.status}`);
    }

    getUserInfo() {
        return fetch(`${this._baseUrl}/users/me`, {
            headers: this._headers
        })
        .then(res => this.getResStatus(res));
    }

    getInitialCards() {
        return fetch(`${this._baseUrl}/cards`, {
            headers: this._headers
        })
        .then(res => this.getResStatus(res));
    }

    getAppInfo() {
        return Promise.all([ this.getUserInfo(), this.getInitialCards() ]);
    }

    editUserInfo({name, about}) {
        return fetch(`${this._baseUrl}/users/me`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
              name: `${name}`,
              about: `${about}`
            })
        })
        .then(res => this.getResStatus(res));
    }

    addNewCard({name, link}) {
        return fetch(`${this._baseUrl}/cards`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({
                link: `${link}`,
                name: `${name}`
            })
        })
        .then(res => this.getResStatus(res));
    }

    deleteCard(cardId) {
        return fetch(`${this._baseUrl}/cards/${cardId}`, {
            method: 'DELETE',
            headers: this._headers
        })
        .then(res => this.getResStatus(res));
    }
    
    editAvatar({avatar}) {
        return fetch(`${this._baseUrl}/users/me/avatar`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
              avatar: `${avatar}`
            })
        })
        .then(res => this.getResStatus(res));
    }
    
    changeLikeCardStatus(id, isLiked) {
        return fetch(`${this._baseUrl}/cards/likes/${id}`, {
            method: `${isLiked ? 'PUT' : 'DELETE'}`,
            headers: this._headers
        })
        .then(res => this.getResStatus(res));
    }
}

export const api = new Api(apiInfo);