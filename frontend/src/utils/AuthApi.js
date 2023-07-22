class AuthApi {
  constructor() {
    this._baseUrl = "https://auth.nomoreparties.co";
    this._signUp = "/signup";
    this._signIn = "/signin";
  }

  _getResponseData(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(res.status);
    }
  }

  signUp(userData) {
    return fetch(this._baseUrl + this._signUp, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        password: userData.password,
        email: userData.email,
      }),
    }).then((res) => this._getResponseData(res));
  }

  signIn(userData) {
    return fetch(this._baseUrl + this._signIn, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        password: userData.password,
        email: userData.email,
      }),
    }).then((res) => this._getResponseData(res));
  }

  getUserData(jwt) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
    }).then((res) => this._getResponseData(res));
  }
}

const authApi = new AuthApi();

export default authApi;
