class Api {
  constructor() {
    this._baseUrl = "https://mesto.nomoreparties.co/v1/cohort-64";
    this._headers = {
      authorization: "8609f7f5-114a-489c-ab91-b39ccae89b1d",
      "Content-Type": "application/json",
    };
  }

  _getResponseData(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(res.status);
    }
  }

  fetchUserInfo() {
    return fetch(this._baseUrl + "/users/me", {
      headers: this._headers,
    }).then((res) => this._getResponseData(res));
  }

  getCardsfromServer() {
    return fetch(this._baseUrl + "/cards", {
      headers: this._headers,
    }).then((res) => this._getResponseData(res));
  }

  patchProfileInfo(userData) {
    return fetch(this._baseUrl + "/users/me", {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: userData.name,
        about: userData.about,
      }),
    }).then((res) => this._getResponseData(res));
  }

  postNewCard(cardData) {
    return fetch(this._baseUrl + "/cards", {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: cardData.name,
        link: cardData.link,
      }),
    }).then((res) => this._getResponseData(res));
  }

  deleteCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    }).then((res) => this._getResponseData(res));
  }

  putLike(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: "PUT",
      headers: this._headers,
    }).then((res) => this._getResponseData(res));
  }

  deleteLike(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: "DELETE",
      headers: this._headers,
    }).then((res) => this._getResponseData(res));
  }

  patchAvatar(avatarLink) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: avatarLink,
      }),
    }).then((res) => this._getResponseData(res));
  }
}

const api = new Api();

export default api;
