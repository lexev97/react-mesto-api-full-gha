class AuthApi {
  constructor() {
    // this._baseUrl = "https://api.place.nomoredomains.xyz";
    this._baseUrl = 'http://localhost:5000';
    this._signUp = '/signup';
    this._signIn = '/signin';
    this._signOut = '/signout';
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
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({
        password: userData.password,
        email: userData.email,
      }),
    }).then((res) => this._getResponseData(res));
  }

  signIn(userData) {
    return fetch(this._baseUrl + this._signIn, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({
        password: userData.password,
        email: userData.email,
      }),
    }).then((res) => this._getResponseData(res));
  }

  signOut() {
    return fetch(this._baseUrl + this._signOut, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((res) => this._getResponseData(res));
  }

  getUserData() {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((res) => this._getResponseData(res));
  }
}

const authApi = new AuthApi();

export default authApi;
