export const BASE_URL = 'https://api.diplom.maxooin.nomoredomains.work';

function checkResponse(res) {
  return res.json()
    .then((data) => {
      if (res.ok && res.status !== 203) {
        return data
      }
      return Promise.reject(new Error(data.message));
    });
}

export const signup = (data) => {
  return fetch(`${ BASE_URL }/signup`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  })
    .then(checkResponse)
}

export function signin(data) {
  return fetch(`${ BASE_URL }/signin`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  })
    .then(checkResponse)
}

export const signout = () => {
  return fetch(`${ BASE_URL }/signout`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      "Content-Type": "application/json"
    }
  })
    .then(checkResponse)
}

export const checkToken = () => {
  return fetch(`${ BASE_URL }/users/me`, {
    method: 'GET',
    credentials: 'include',
    headers: {
      "Content-Type": "application/json"
    }
  })
    .then(checkResponse)
}
