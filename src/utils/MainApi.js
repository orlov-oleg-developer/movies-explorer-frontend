class MainApi {
  constructor(options) {
    this.url = options.baseUrl;
    this.headers = options.headers;
    this.token = localStorage.getItem('jwt');
    this.headers = {
      ...this.headers,
      authorization: `Bearer ${this.token}`
    }
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(res);
  }

  _request(url, options) {
    return fetch(url, options).then(this._checkResponse);
  }

  // User requests

  getUserInfo() {
    return this._request(`${this.url}/users/me`, {
      method: "GET",
      headers: this.headers,
    });
  }

  updateUserInfo(profileData) {
    return this._request(`${this.url}/users/me`, {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify({
        name: profileData.name,
        email: profileData.email,
      })
    })
  }

  updateToken(token) {
    this.token = token;
    this.headers = {
      ...this.headers,
      authorization: `Bearer ${token}`
    }
  }

  // Movie requests

  getMovies() {
    return this._request(`${this.url}/movies`, {
      method: "GET",
      headers: this.headers,
    })
  }

  createMovie(movieData) {
    return this._request(`${this.url}/movies`, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify(movieData),
    })
  }

  deleteMovie(movieID) {
    return this._request(`${this.url}/movies/${movieID}`, {
      method: "DELETE",
      headers: this.headers,
    })
  }
}


const mainApi = new MainApi({
  baseUrl: 'https://api.movies.developer.nomoredomains.rocks/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

export default mainApi
