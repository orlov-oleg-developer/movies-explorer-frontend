// export const BASE_URL = 'https://api.movies.developer.nomoredomains.rocks/api'
export const BASE_URL = 'http://localhost:3005/api'

export const getContent = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      "Authorization" : `Bearer ${token}`
    }
  })
    .then(checkResponse)
}

export const register = ({ mailInput, passwordInput, nameInput }) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: nameInput.value,
      email: mailInput.value,
      password: passwordInput.value,
    })
  })
    .then(checkResponse);
}

export const authorize = ({ mailInput, passwordInput }) => {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email: mailInput.value,
      password: passwordInput.value,
    })
  })
    .then(checkResponse);
}

const checkResponse = (res) => res.ok ? res.json() : Promise.reject(res)
