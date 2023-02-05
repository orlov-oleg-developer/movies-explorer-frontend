class Api {
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
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  _request(url, options) {
    return fetch(url, options).then(this._checkResponse)
  }

  updateToken(token) {
    this.token = token;
    this.headers = {
      ...this.headers,
      authorization: `Bearer ${token}`
    }
  }
}


const api = new Api({
  baseUrl: 'http://localhost:3005/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

export default api
