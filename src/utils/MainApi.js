class MainApi {
  constructor(apiSetting) {
    this._url = apiSetting.url
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${ res.status }`);
  }

  getMoviesCards() {
    return fetch(`${ this._url }/movies`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      }
    })
      .then(this._checkResponse)
  }

  updateUserInfo(data) {
    return fetch(`${ this._url }/users/me`, {
      method: 'PATCH',
      body: JSON.stringify(data),
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      }
    })
      .then(this._checkResponse)
  }

  saveMoviesCard(data) {
    return fetch(`${ this._url }/movies`, {
      method: 'POST',
      body: JSON.stringify(data),
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      }
    })
      .then(this._checkResponse)
  }

  deleteMoviesCard(cardId) {
    return fetch(`${ this._url }/movies/${ cardId }`, {
      method: 'DELETE',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      }
    })
      .then(this._checkResponse)
  }
}

const mainApi = new MainApi({
  url: 'https://api.diplom.maxooin.nomoredomains.work'
});

export default mainApi;

